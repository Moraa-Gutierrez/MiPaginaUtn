import React, { createContext, useState, useEffect, useContext } from 'react';
import { api, leerToken } from '../utils/api.js';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext) || {};

  // 1. Cargar el carrito activo desde la Base de Datos al iniciar o cambiar de usuario
  useEffect(() => {
    const fetchCart = async () => {
      const token = leerToken();
      if (!token) {
        setCart([]);
        return;
      }

      try {
        setLoading(true);
        const response = await api("GET", "/orders/cart");
        if (response && response.items) {
          const formattedItems = response.items.map((item) => {
            const prodId = item.product_id?._id
              ? item.product_id._id.toString()
              : item.product_id
              ? item.product_id.toString()
              : item.id;
            return {
              id: prodId,
              _id: prodId,
              name: item.product_name,
              price: item.unit_price,
              cartQuantity: item.quantity,
            };
          });
          setCart(formattedItems);
        }
      } catch (error) {
        console.error("Error al sincronizar el carrito con la BD:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // 2. Agregar al carrito (Persistiendo en la BD del Backend)
  const addToCart = async (product, quantity = 1) => {
    try {
      const productId = (product._id || product.id)?.toString();
      if (!productId) {
        console.error("No se encontró el ID del producto:", product);
        return;
      }

      // Llamada al backend para guardar en el carrito 'draft' de MongoDB
      await api("POST", "/orders/items", {
        productId: productId,
        quantity: quantity,
      });

      // Actualizamos el estado local de React
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => (item.id || item._id)?.toString() === productId);
        if (existingProduct) {
          return prevCart.map((item) =>
            (item.id || item._id)?.toString() === productId
              ? { ...item, cartQuantity: item.cartQuantity + quantity }
              : item
          );
        }
        return [...prevCart, { ...product, id: productId, _id: productId, cartQuantity: quantity }];
      });
    } catch (error) {
      console.error("Error al agregar producto al carrito en la BD:", error);
    }
  };

  // 3. Eliminar del carrito
  const removeFromCart = async (productId) => {
    try {
      await api("DELETE", `/orders/items/${productId}`);
      setCart((prevCart) => prevCart.filter((item) => (item.id || item._id)?.toString() !== productId?.toString()));
    } catch (error) {
      console.error("Error al eliminar ítem del carrito:", error);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id || item._id)?.toString() === productId?.toString() ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.cartQuantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.cartQuantity, 0);
  };

  // Alias y métodos de compatibilidad
  const items = cart;
  const unidades = getCartCount();
  const total = getCartTotal();

  const increment = (productId) => {
    const item = cart.find((i) => (i.id || i._id)?.toString() === productId?.toString());
    if (item) {
      addToCart(item, 1);
    }
  };

  const decrement = (productId) => {
    const item = cart.find((i) => (i.id || i._id)?.toString() === productId?.toString());
    if (item) {
      if (item.cartQuantity <= 1) {
        removeFromCart(productId);
      } else {
        updateCartQuantity(productId, item.cartQuantity - 1);
      }
    }
  };

  const removeItem = removeFromCart;

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        unidades,
        total,
        loading,
        addToCart,
        removeFromCart,
        removeItem,
        updateCartQuantity,
        increment,
        decrement,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un <CartProvider>");
  }
  return context;
}