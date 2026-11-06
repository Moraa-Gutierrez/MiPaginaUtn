import { useState } from "react";
import useOrders from "../../hooks/orders/useOrders";
import { notifyError, notifyToast, confirmAction } from "../../utils/notify";
import "../../Css/MenuPages/OrderPage.css"; 

function OrdersPage() {
  const { orders, loading, error, payOrder, cancelOrder } = useOrders();

  const conAviso = async (accion, exito) => {
    const { ok, error } = await accion();
    if (ok) {
      notifyToast(exito);
    } else {
      notifyError("No se pudo completar la acción", error?.message || "Intentá de nuevo más tarde.");
    }
  };

  const handleCancel = async (id) => {
    const confirmado = await confirmAction(
      "¿Cancelar el pedido?",
      "El stock volverá automáticamente al catálogo.",
      "Sí, cancelar"
    );
    if (confirmado) {
      conAviso(() => cancelOrder(id), "Pedido cancelado correctamente");
    }
  };

  if (loading && (orders || []).length === 0) {
    return <p className="orders-loading">Cargando tus pedidos...</p>;
  }

  return (
    <main className="orders-main-container">
      <h1>Mis Pedidos</h1>

      {error && <p className="orders-error">{error.message || "Error al cargar los pedidos"}</p>}

      {(!orders || orders.length === 0) ? (
        <p className="orders-empty">Todavía no realizaste ninguna compra en M&L.</p>
      ) : (
        <div className="orders-list">
          {orders.map((pedido) => (
            <div className="order-card" key={pedido.id}>
              <div className="order-card-header">
                <span className="order-date"><strong>Fecha:</strong> {pedido.fecha}</span>
                <span className={`order-status status-${pedido.estado}`}>
                  {pedido.estado}
                </span>
              </div>

              <div className="order-card-body">
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio unitario</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(pedido.lineas || []).map((linea) => (
                      <tr key={linea.libroId || linea.productoId}>
                        <td className="product-title">{linea.titulo || linea.nombre}</td>
                        <td>${linea.precioUnitario}</td>
                        <td>{linea.cantidad}</td>
                        <td>${linea.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="order-footer-row">
                  <h3 className="order-total">Total: ${pedido.total}</h3>

                  {pedido.estado === "pendiente" && (
                    <div className="order-actions">
                      <button
                        className="btn-pay"
                        disabled={loading}
                        onClick={() => conAviso(() => payOrder(pedido.id), "¡Pedido pagado con éxito!")}
                      >
                        Pagar
                      </button>
                      <button
                        className="btn-cancel"
                        disabled={loading}
                        onClick={() => handleCancel(pedido.id)}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="orders-disclaimer">
        <small>
          Cada línea guarda el precio que pagaste en el momento de la confirmación. 
          Si un producto cambia de precio más adelante, tu pedido se mantiene congelado y protegido.
        </small>
      </p>
    </main>
  );
}

export default OrdersPage;