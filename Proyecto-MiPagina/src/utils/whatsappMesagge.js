export const WHATSAPP_NUMBER = "5492262356177";
/**
 * Formatea un número como moneda en pesos argentinos.
 * @param {number} value
 * @returns {string}
 */
function formatCurrency(value) {
  const number = Number(value) || 0;
  return number.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });
}

/**
 * Traduce el método de entrega interno a un texto legible.
 * @param {"domicilio"|"retiro"} deliveryMethod
 */
function formatDeliveryMethod(deliveryMethod) {
  return deliveryMethod === "retiro"
    ? "Retiro por punto de encuentro"
    : "Envío a domicilio";
}

/**
 * Traduce el método de pago interno a un texto legible.
 * @param {"transferencia"|"efectivo"} paymentMethod
 */
function formatPaymentMethod(paymentMethod) {
  return paymentMethod === "efectivo" ? "Efectivo" : "Transferencia bancaria";
}

/**
 * Arma el detalle de dirección en una sola línea legible.
 * Si el método de entrega es "retiro", no hace falta dirección completa.
 */
function formatAddress(shipping) {
  if (!shipping) return "A coordinar";
  if (shipping.deliveryMethod === "retiro") {
    return "Retiro por punto de encuentro (a coordinar)";
  }
  const { street, city, postalCode } = shipping;
  const parts = [street, city, postalCode ? `CP ${postalCode}` : null].filter(
    Boolean
  );
  return parts.length ? parts.join(", ") : "A coordinar";
}

/**
 * Construye el cuerpo del mensaje de WhatsApp en texto plano,
 * con formato *negrita* y emojis, listo para encodear.
 *
 * @param {Object} order - Orden ya actualizada a "pending".
 * @param {string} order.order_number - Número/código de la orden.
 * @param {Array} order.items - Productos del carrito.
 * @param {string} order.items[].name - Nombre del producto.
 * @param {number} order.items[].quantity - Cantidad.
 * @param {number} order.items[].subtotal - Subtotal de esa línea.
 * @param {number} order.total_amount - Total a pagar.
 * @param {Object} customer - Datos del comprador.
 * @param {string} customer.fullName
 * @param {Object} shipping - Datos de envío.
 * @param {"domicilio"|"retiro"} shipping.deliveryMethod
 * @param {string} [shipping.street]
 * @param {string} [shipping.city]
 * @param {string} [shipping.postalCode]
 * @param {"transferencia"|"efectivo"} shipping.paymentMethod
 * @param {string} [shipping.notes] - Notas/aclaraciones opcionales.
 * @returns {string} Mensaje en texto plano, sin encodear.
 */
export function buildWhatsAppMessage({ order, customer, shipping }) {
 const itemsText = (order.items || [])
    .map((item) => {
      const nombre = item.product_name || item.name;
      const subtotalItem = (item.unit_price || item.price || 0) * (item.quantity || 1);
      return `• ${item.quantity}x ${nombre} — ${formatCurrency(subtotalItem)}`;
    })
    .join("\n");

  const lines = [
    `¡Hola M&L! 👋 Quiero confirmar mi pedido.`,
    ``,
    `*Pedido:* #${order.order_number}`,
    `*Cliente:* ${customer.fullName}`,
    ``,
    `📦 *Detalle del pedido:*`,
    itemsText,
    ``,
    `💰 *Total a pagar:* ${formatCurrency(order.total_amount)}`,
    ``,
    `📍 *Entrega:* ${formatDeliveryMethod(shipping.deliveryMethod)}`,
    `*Dirección:* ${formatAddress(shipping)}`,
    ``,
    `💳 *Método de pago:* ${formatPaymentMethod(shipping.paymentMethod)}`,
  ];

  if (shipping.notes && shipping.notes.trim()) {
    lines.push(``, `📝 *Notas:* ${shipping.notes.trim()}`);
  }

  lines.push(``, `¡Gracias! 🌼`);

  return lines.join("\n");
}

/**
 * Construye la URL completa de wa.me, ya con el mensaje encodeado.
 *
 * @param {Object} params - Mismos parámetros que buildWhatsAppMessage.
 * @param {string} [phoneNumber] - Número de destino; por defecto WHATSAPP_NUMBER.
 * @returns {string} URL lista para usar en window.open().
 */
export function buildWhatsAppUrl(params, phoneNumber = WHATSAPP_NUMBER) {
  const message = buildWhatsAppMessage(params);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
