Actúa como un desarrollador Senior Full-Stack especializado en la pila MERN (Node.js, Express, React, MongoDB) y en desarrollo frontend moderno con CSS puro.

Necesito que me ayudes a implementar el componente frontend de Checkout y la lógica de generación del mensaje para WhatsApp de mi e-commerce real.

---
### 🏪 CONTEXTO DEL PROYECTO Y MARCA
- Proyecto: E-commerce completo para "M&L", una marca familiar de bijouterie, velas, perfumes y figuras de yeso basada en Argentina.
- Desarrollo: El desarrollo lo llevo adelante yo como diseñadora e ingeniera web, coordinando el catálogo y la gestión operativa con mi mamá (Karina).
- Estilo Visual y CSS: 
  * NO usaremos Tailwind ni librerías de estilos pesadas. Los archivos de estilos DEBEN ser CSS puro (`.css`).
  * RESTRICCIÓN DE DISEÑO: No se deben alterar los colores, tipografías ni la identidad visual previa de la marca. El diseño debe mantener una línea delicada, limpia y adaptable a pantallas móviles.

---
### 🛠️ ENTORNO TÉCNICO Y ARQUITECTURA DEL PROYECTO
1. Stack Backend: Node.js + Express + MongoDB (Mongoose) + JWT para autenticación.
2. Stack Frontend: React.js (Vite / CRA), React Router DOM v6, React Bootstrap (utilizado puntualmente para componentes como Dropdown/Modales), y Lucide React / FontAwesome para iconografía.
3. Entorno Local: VS Code, Git, servidor backend en Node.js y React frontend.
4. Estado de Autenticación: Manejado mediante `AuthContext` (`useAuth`), que provee los datos del usuario logueado (ej. `usuario.name`, `usuario.lastname`, `usuario.email`).
5. Estructura de la Base de Datos (`Order`):
   - Los productos en el carrito viven en la colección `Order` de MongoDB como subdocumentos en una orden con `status: "draft"`.
   - Estados de la Orden:
     * "draft": Carrito activo del usuario mientras navega la tienda.
     * "pending": Pedido registrado tras el checkout, a la espera de confirmación de pago manual por WhatsApp.
     * "confirmed" / "shipped" / "completed" / "cancelled": Estados gestionados manualmente por nosotras desde nuestro Panel de Administración (`/admin/orders`).

---
### 💼 LÓGICA DE NEGOCIO Y REGLAS DE STOCK (CRÍTICO)
- NO se utilizan pasarelas de pago automáticas (como Mercado Pago o Stripe).
- NO SE DESCUENTA STOCK AUTOMÁTICAMENTE durante el checkout. Como es un proyecto familiar local, preferimos que los productos queden disponibles ("standby") en la tienda hasta que verifiquemos la transferencia/pago por WhatsApp.
- Al hacer clic en "Finalizar Compra":
  1. Se debe llamar al endpoint del backend que actualiza el estado de la orden de "draft" a "pending" y guarda los datos de envío (`shipping`).
  2. Inmediatamente después, se debe vaciar el carrito activo localmente y redirigir al comprador a WhatsApp con un mensaje preescrito completo y limpio.

---
### 🎯 REQUISITOS DEL COMPONENTE DE CHECKOUT Y WHATSAPP
1. Formulario de Datos Mínimos (Componente React):
   - Campos: Nombre completo y email (autocompletados si el usuario está logueado mediante `useAuth`), teléfono de contacto, método de entrega (Envío a domicilio / Retiro por punto de encuentro), dirección completa (calle/número, ciudad, código postal), método de pago preferido (Transferencia bancaria / Efectivo) y campo opcional para notas/aclaraciones.
2. Formato del Mensaje de WhatsApp:
   - Número de destino: "5492262000000" (configurable).
   - Estructura limpia y fácil de leer con emojis (📦, 📍, 💰, 💳) y negritas (`*texto*`).
   - Debe incluir: Número de orden (`order_number`), detalle formateado de cada producto (cantidad, nombre, subtotal), total a pagar (`total_amount`), dirección de entrega y método de pago elegido.
   - Usar `encodeURIComponent()` para construir el enlace `https://wa.me/{telefono}?text={mensaje}`.
   - Abrir WhatsApp en una nueva pestaña (`window.open(..., '_blank')`) y navegar al usuario a su historial de compras (`/profile/orders`).

---
### 📦 LO QUE NECESITO QUE ME ENTREGUES
1. El código en React del componente (ej. `CheckoutWhatsApp.jsx`) usando hooks (`useState`, `useEffect`, `useNavigate`).
2. El archivo de estilos en CSS puro (`CheckoutWhatsApp.css`) acorde a la estética limpia de la app.
3. La función de utilidad encargada de construir y formatear la cadena de texto URI para WhatsApp.
4. Explicación paso a paso de cómo importar y conectar el componente con nuestra llamada a la API y el `AuthContext`.