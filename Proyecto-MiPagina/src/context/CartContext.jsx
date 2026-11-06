import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Error parsing cart from localStorage", e);
      return [];
    }
  });

  // Guardar automáticamente en el localStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agregar al carrito (ahora soporta cantidad por defecto o personalizada)
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id 
            ? { ...item, cartQuantity: item.cartQuantity + quantity } 
            : item
        );
      }
      return [...prevCart, { ...product, cartQuantity: quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, cartQuantity: quantity } : item
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

  // 🔗 Puentes y Alias para compatibilidad total con tus componentes (CartPage, Header, etc.)
  const items = cart;
  const unidades = getCartCount();
  const total = getCartTotal();

  const increment = (productId) => {
    const item = cart.find((i) => i.id === productId);
    if (item) {
      updateCartQuantity(productId, item.cartQuantity + 1);
    }
  };

  const decrement = (productId) => {
    const item = cart.find((i) => i.id === productId);
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