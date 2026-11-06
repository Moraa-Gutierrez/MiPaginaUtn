import { useNavigate } from "react-router-dom"
import useCart from "../../hooks/orders/useCart"
import useOrders from "../../hooks/orders/useOrders"
import { notifyError, confirmAction, notifyToast } from "../../utils/notify"
import "../../Css/MenuPages/CartPage.css"

function CartPage() {
  const { items, unidades, total, loading, error, increment, decrement, removeItem, clearCart } = useCart()
  const { createOrder, loading: creando } = useOrders()
  const navigate = useNavigate()

  const handleCheckout = async () => {
    const confirmado = await confirmAction(
      "¿Confirmar la compra?",
      `Vas a comprar ${unidades} ${unidades === 1 ? "unidad" : "unidades"} por $${total}.`,
      "Ir a completar datos"
    )
    if (!confirmado) return

    navigate("/checkout")
  }
  const handleClearCart = async () => {
    const confirmed = await confirmAction(
      "¿Vaciar el carrito?",
      "Se quitarán todos los productos.",
      "Sí, vaciar"
    )
    if (confirmed) clearCart()
  }

  if (loading && (items || []).length === 0) return <p className="cart-loading">Cargando carrito...</p>

  return (
    <main className="cart-main-container">
      <h1>Mi Carrito</h1>

      {error && <p className="cart-error">{error.message}</p>}

      {(!items || items.length === 0) ? (
        <p className="cart-empty">Tu carrito está vacío.</p>
      ) : (
        <div className="cart-content-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {(items || []).map((item) => (
                <tr key={item.id}>
                  <td className="cart-product-title" style={{ textTransform: "capitalize" }}>
                    {item.name}
                  </td>
                  <td>${item.price}</td>
                  <td>
                    {/* Controles funcionales para sumar, restar y ver la cantidad */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                      <button onClick={() => decrement(item.id)} className="btn-qty">-</button>
                      <span>{item.cartQuantity}</span>
                      <button onClick={() => increment(item.id)} className="btn-qty">+</button>
                    </div>
                  </td>
                  <td>${item.price * item.cartQuantity}</td>
                  <td>
                    {/* Botón funcional para eliminar el ítem específico */}
                    <button onClick={() => removeItem(item.id)} className="btn-remove">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary-section">
            <h2>Total: ${total}</h2>
            <p className="cart-units-info">{unidades} {unidades === 1 ? "unidad" : "unidades"}</p>

            <div className="cart-actions">
              <button className="btn-checkout" onClick={handleCheckout} disabled={loading || creando}>
                {creando ? "Confirmando..." : "Finalizar compra"}
              </button>
              <button className="btn-clear" onClick={handleClearCart} disabled={loading}>
                Vaciar carrito
              </button>
            </div>
          </div>

          <p className="cart-disclaimer">
            <small>
              El carrito se guarda de forma local en tu navegador.
              Al confirmar la compra, se genera el pedido y el carrito se vacía automáticamente.
            </small>
          </p>
        </div>
      )}
    </main>
  )
}

export default CartPage