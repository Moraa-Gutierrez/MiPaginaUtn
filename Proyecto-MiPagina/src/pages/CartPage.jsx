import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
  } = useCart();

  const handleQtyChange = (productId, e) => {
    const qty = parseInt(e.target.value) || 0;
    updateCartQuantity(productId, qty);
  };

  const handleCheckout = () => {
    window.alert("¡Gracias por tu compra! Tu orden de e-commerce ha sido procesada de manera simulada. ✨🛒🛍️");
    clearCart();
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arimo, sans-serif', color: '#464d5d' }}>
      <h1 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '60px', color: '#b79067', textAlign: 'center', marginBottom: '20px' }}>
        Tu Carrito de Compras
      </h1>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#f9f9f9', borderRadius: '10px' }}>
          <p style={{ color: '#666', fontSize: '20px', marginBottom: '20px' }}>El carrito está vacío por el momento.</p>
          <Link
            to="/products"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#b79067',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Volver a la Tienda
          </Link>
        </div>
      ) : (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #b79067' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#464d5d', background: 'none' }}>Producto</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#464d5d', background: 'none' }}>Precio</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#464d5d', background: 'none' }}>Cantidad</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#464d5d', background: 'none' }}>Subtotal</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#464d5d', background: 'none' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                    <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', color: '#b79067', fontWeight: 'bold' }}>
                    ${item.price}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <input
                      type="number"
                      min="1"
                      value={item.cartQuantity}
                      onChange={(e) => handleQtyChange(item.id, e)}
                      style={{ width: '60px', padding: '6px', textAlign: 'center', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', color: '#b79067', fontWeight: 'bold' }}>
                    ${(item.price * item.cartQuantity).toFixed(2)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#d9534f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
            <button
              onClick={clearCart}
              style={{
                padding: '10px 20px',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Vaciar Carrito
            </button>

            <div style={{ textAlign: 'right' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#464d5d', fontFamily: 'Arimo, sans-serif' }}>
                Total: <span style={{ color: '#b79067' }}>${getCartTotal().toFixed(2)}</span>
              </h3>
              <button
                onClick={handleCheckout}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#b79067',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                Finalizar Compra 💳
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
