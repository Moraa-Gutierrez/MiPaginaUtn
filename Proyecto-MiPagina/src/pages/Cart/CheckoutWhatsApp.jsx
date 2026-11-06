import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/user/useAuth"; 
import useCart from "../../hooks/orders/useCart"; 
import {api} from "../../utils/api";
import { buildWhatsAppUrl } from "../../utils/whatsappMesagge";
import "../../Css/Cart/CheckoutWhatsApp.css";
 
function CheckoutWhatsApp({ onOrderConfirmed }) {
  const { user, usuario } = useAuth();
  const currentUser = user || usuario;
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
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
 
  // Autocompletar datos del usuario autenticado de forma segura
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || currentUser.nombre || "",
        lastname: currentUser.lastname || currentUser.lastName || currentUser.apellido || "",
        email: currentUser.email || "",
      }));
    }
  }, [currentUser]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const isRetiro = formData.deliveryMethod === "retiro";
 
  // Validación estricta de datos sensibles en el cliente
  const validate = () => {
    if (!formData.name.trim()) return "El nombre es obligatorio.";
    if (!formData.lastname.trim()) return "El apellido es obligatorio.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return "Por favor, ingresa un correo electrónico válido.";
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      return "Ingresa un número de teléfono de contacto válido.";
    }

    if (!isRetiro) {
      if (!formData.street.trim()) return "La calle y número son obligatorios para el envío a domicilio.";
      if (!formData.city.trim()) return "La ciudad es obligatoria para el envío a domicilio.";
    }

    if (!items || items.length === 0) {
      return "Tu carrito está vacío. Agrega productos antes de finalizar la compra.";
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
 
    // Estructura que espera tu backend (shippingData)
    // Estructura adaptada para que coincida con el backend y el schema
 const shippingData = {
      deliveryMethod: formData.deliveryMethod,
      street: isRetiro ? "Retiro en punto de encuentro" : formData.street,
      city: isRetiro ? "Necochea" : formData.city,
      zip_code: isRetiro ? "7630" : formData.postalCode, // 👈 Clave: el backend exige zip_code y no postalCode
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
      phone: formData.phone,
    };
 
    try {
      console.log("📤 Datos enviados al backend:", shippingData);
      
      const confirmedOrder = await api("POST", "/orders/checkout", { shippingData });

      // Objeto para armar el mensaje de WhatsApp (puedes usar el mismo shippingData o mantener este)
      const shipping = {
        deliveryMethod: formData.deliveryMethod,
        street: isRetiro ? "Retiro en punto de encuentro" : formData.street,
        city: isRetiro ? "Necochea" : formData.city,
        zip_code: isRetiro ? "7630" : formData.postalCode,
        postalCode: isRetiro ? "7630" : formData.postalCode,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        phone: formData.phone,
      };
 
      // 2) Armamos el link de WhatsApp utilizando el order_number oficial de MongoDB
      const waUrl = buildWhatsAppUrl({
        order: {
          id: confirmedOrder.order_number,
          order_number: confirmedOrder.order_number,
          items: confirmedOrder.items,
          total_amount: confirmedOrder.total_amount,
        },
        customer: { 
          name: formData.name, 
          lastname: formData.lastname, 
          fullName: `${formData.name} ${formData.lastname}`.trim(), 
          email: formData.email, 
          phone: formData.phone 
        },
        shipping,
      });

      window.open(waUrl, "_blank");
 
      // 3) Limpieza del carrito y redirección
      clearCart();
      if (onOrderConfirmed) {
        onOrderConfirmed();
      }
 
      navigate("/");
    } catch (err) {
      console.error("❌ Error al procesar checkout:", err);
      setError(err.message || "Ocurrió un error inesperado al procesar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <form className="checkout-wa" onSubmit={handleSubmit}>
      <h2 className="checkout-wa__title">Finalizar compra</h2>
 
      <div className="checkout-wa__field">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="checkout-wa__field">
        <label htmlFor="lastname">Apellido</label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          value={formData.lastname}
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
        {isSubmitting ? "Procesando pedido..." : "Enviar pedido por WhatsApp"}
      </button>
    </form>
  );
}
 
export default CheckoutWhatsApp;