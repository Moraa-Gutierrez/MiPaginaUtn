import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {useCart} from "../../context/CartContext";
import CheckoutWhatsApp from "../../context/CheckoutWhatsApp";
import "../../Css/Cart/CheckoutPage.css";

/**
 * CheckoutPage
 *
 * Puente entre el estado del carrito (CartContext) y el formulario visual
 * <CheckoutWhatsApp />. Se encarga de:
 * 1. Sincronizar el carrito local con el backend para obtener/crear la
 *    orden "draft" en MongoDB.
 * 2. Mostrar un estado de carga mientras se resuelve esa sincronización.
 * 3. Manejar el caso de carrito vacío (redirección) y el de error de red
 *    (mensaje + reintentar).
 * 4. Renderizar <CheckoutWhatsApp /> con la orden ya resuelta.
 */
function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [draftOrder, setDraftOrder] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const syncDraftOrder = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      // Sincroniza el carrito local con el backend: si ya existe una orden
      // "draft" para este usuario la devuelve, si no la crea con los
      // productos actuales del carrito.
      const token = localStorage.getItem('token');

      const response = await fetch("/api/orders/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(
          "No pudimos conectar con el servidor para preparar tu pedido."
        );
      }

      const order = await response.json();
      setDraftOrder(order);
      setStatus("ready");
    } catch (err) {
      setErrorMessage(
        err.message || "Ocurrió un error al cargar los datos de tu pedido."
      );
      setStatus("error");
    }
  }, [cart]);

  // Guarda: carrito vacío -> redirigir, no tiene sentido mostrar checkout.
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
      return;
    }
    syncDraftOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return (
      <div className="checkout-page checkout-page--centered">
        <div className="checkout-page__spinner" aria-hidden="true" />
        <p className="checkout-page__status-text">
          Cargando los datos de tu pedido...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="checkout-page checkout-page--centered">
        <p className="checkout-page__status-text checkout-page__status-text--error">
          {errorMessage}
        </p>
        <div className="checkout-page__actions">
          <button
            type="button"
            className="checkout-page__btn checkout-page__btn--primary"
            onClick={syncDraftOrder}
          >
            Reintentar
          </button>
          <button
            type="button"
            className="checkout-page__btn checkout-page__btn--secondary"
            onClick={() => navigate("/cart")}
          >
            Volver al carrito
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <CheckoutWhatsApp order={draftOrder} onOrderConfirmed={clearCart} />
    </div>
  );
}

export default CheckoutPage;