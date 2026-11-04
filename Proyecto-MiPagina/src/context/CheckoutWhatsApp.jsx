import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import { buildWhatsAppUrl } from "../utils/whatsappMesagge"; 
import"../Css/Cart/CheckoutWhatsApp.css";

/**
 * CheckoutWhatsApp
 *
 * Formulario de checkout que:
 * 1. Autocompleta nombre/email si el usuario está logueado (useAuth).
 * 2. Al confirmar, llama al backend para pasar la orden de "draft" a "pending".
 * 3. Vacía el carrito local y redirige a WhatsApp con el mensaje armado.
 * 4. Navega al usuario a /profile/orders.
 *
 * Props:
 * - order: la orden "draft" actual, ya cargada desde el backend
 *   (incluye _id, order_number, items[], total_amount).
 * - onOrderConfirmed: callback opcional para vaciar el carrito en el estado global
 *   (ej. viene de un CartContext). Si no se pasa, el componente solo limpia
 *   su propio estado local.
 */
function CheckoutWhatsApp({ order, onOrderConfirmed }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    deliveryMethod: "domicilio", // "domicilio" | "retiro"
    street: "",
    city: "",
    postalCode: "",
    paymentMethod: "transferencia", // "transferencia" | "efectivo"
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Autocompletar nombre/email si hay usuario logueado.
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: `${user.name || ""} ${user.lastname || ""}`.trim(),
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isRetiro = formData.deliveryMethod === "retiro";

  const validate = () => {
    if (!formData.fullName.trim()) return "Falta el nombre completo.";
    if (!formData.email.trim()) return "Falta el email.";
    if (!formData.phone.trim()) return "Falta el teléfono de contacto.";
    if (!isRetiro) {
      if (!formData.street.trim()) return "Falta la calle y número.";
      if (!formData.city.trim()) return "Falta la ciudad.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    const shipping = {
      deliveryMethod: formData.deliveryMethod,
      street: formData.street,
      city: formData.city,
      postalCode: formData.postalCode,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
      phone: formData.phone,
    };

    try {
      // 1) Backend: pasar la orden de "draft" a "pending" y guardar shipping.
      // Ajustá la ruta/cliente HTTP a cómo esté armado tu proyecto (fetch, axios, etc).
      const response = await fetch(`/api/orders/${order._id}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // si usás cookies para el JWT
        body: JSON.stringify({ shipping }),
      });

      if (!response.ok) {
        throw new Error("No se pudo confirmar el pedido. Intentá de nuevo.");
      }

      const updatedOrder = await response.json();

      // 2) Vaciar el carrito local (estado global, si existe).
      if (onOrderConfirmed) {
        onOrderConfirmed();
      }

      // 3) Armar el link de WhatsApp y abrirlo en una pestaña nueva.
      const waUrl = buildWhatsAppUrl({
        order: updatedOrder,
        customer: { fullName: formData.fullName },
        shipping,
      });
      window.open(waUrl, "_blank");

      // 4) Navegar al historial de compras.
      navigate("/profile/orders");
    } catch (err) {
      setError(err.message || "Ocurrió un error al confirmar el pedido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="checkout-wa" onSubmit={handleSubmit}>
      <h2 className="checkout-wa__title">Finalizar compra</h2>

      <div className="checkout-wa__field">
        <label htmlFor="fullName">Nombre completo</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="checkout-wa__field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="checkout-wa__field">
        <label htmlFor="phone">Teléfono de contacto</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Ej: 2262 123456"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="checkout-wa__field">
        <label htmlFor="deliveryMethod">Método de entrega</label>
        <select
          id="deliveryMethod"
          name="deliveryMethod"
          value={formData.deliveryMethod}
          onChange={handleChange}
        >
          <option value="domicilio">Envío a domicilio</option>
          <option value="retiro">Retiro por punto de encuentro</option>
        </select>
      </div>

      {!isRetiro && (
        <div className="checkout-wa__address">
          <div className="checkout-wa__field">
            <label htmlFor="street">Calle y número</label>
            <input
              id="street"
              name="street"
              type="text"
              value={formData.street}
              onChange={handleChange}
              required={!isRetiro}
            />
          </div>

          <div className="checkout-wa__row">
            <div className="checkout-wa__field">
              <label htmlFor="city">Ciudad</label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                required={!isRetiro}
              />
            </div>

            <div className="checkout-wa__field">
              <label htmlFor="postalCode">Código postal</label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}

      <div className="checkout-wa__field">
        <label htmlFor="paymentMethod">Método de pago</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="transferencia">Transferencia bancaria</option>
          <option value="efectivo">Efectivo</option>
        </select>
      </div>

      <div className="checkout-wa__field">
        <label htmlFor="notes">Notas / aclaraciones (opcional)</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      {error && <p className="checkout-wa__error">{error}</p>}

      <button
        type="submit"
        className="checkout-wa__submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Confirmando..." : "Finalizar compra"}
      </button>
    </form>
  );
}

export default CheckoutWhatsApp;
