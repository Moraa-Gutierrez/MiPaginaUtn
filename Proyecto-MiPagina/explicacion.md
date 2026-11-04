## Resumen de Arquitectura e Implementación
src/
├── Css/Admin/
│   ├── AdminShared.css             # Sistema de diseño compartido, modales, tablas, badges y loaders
│   ├── ProductManagement.css       # Estilos específicos para catálogo, input multipart y preview
│   └── OrderManagement.css         # Estilos para órdenes, desglose de carrito y card de envío
├── components/Admin/
│   ├── AdminRoute.jsx              # Guardia de seguridad y protección de rol ('admin')
│   ├── AdminNavTabs.jsx            # Barra de pestañas para alternar entre paneles
│   ├── Products/
│   │   ├── ProductTable.jsx        # Tabla con miniatura, categoría, precio, stock y acciones
│   │   ├── ProductFormModal.jsx    # Modal de alta/edición con selector dinámico y carga multipart
│   │   └── DeleteConfirmModal.jsx  # Modal de confirmación para eliminar productos
│   └── Orders/
│       ├── OrderTable.jsx          # Listado interactivo ordenado cronológicamente con badges
│       └── OrderDetailModal.jsx    # Detalle de orden, desglose del carrito, envío y selector de estado
├── hooks/admin/
│   ├── useAdminProducts.jsx        # Hook con soporte FormData, token JWT y manejo de estados
│   └── useAdminOrders.jsx          # Hook para consulta y actualización dinámica de pedidos
├── pages/Admin/
│   ├── ProductManagementPage.jsx   # Vista principal del Panel de Productos (/admin/products)
│   └── OrderManagementPage.jsx     # Vista principal del Panel de Órdenes (/admin/orders)

1. Panel de Gestión de Productos (Catálogo)
Ruta protegida: /admin/products (Componente: 

ProductManagementPage.jsx
)
Estilos: 

ProductManagement.css
Tabla Interactiva (

ProductTable.jsx
):
Columnas: Imagen (thumbnail redondeado con fallback), Nombre y Descripción corta, Categoría (con etiqueta de variante si corresponde), Precio (formateado en ARS) y Stock (con semáforo visual: En stock, Poco stock, Agotado).
Acciones por producto: Botones claros de Editar (ícono lápiz) y Eliminar (ícono papelera).
Formulario de Alta / Edición (

ProductFormModal.jsx
):
Campos obligatorios: name, description, category_id, price y quantity.
Selector dinámico de variantes/materiales: Se activa automáticamente al elegir la Categoría 5 (Figuras de Yeso y Cemento), permitiendo elegir entre yeso o cemento.
Input de carga de imagen (<input type="file" />): Envía los datos empaquetados en un objeto FormData con multipart/form-data, previsualización inmediata en miniatura antes de guardar y opción de remoción.
Confirmación de borrado (DeleteConfirmModal.jsx):
Modal preventivo que detalla la miniatura y el nombre del producto antes de ejecutar el borrado permanente.
Buscador y Paginación: Búsqueda en vivo por nombre/descripción, filtro select por categoría, filtro por estado de stock y paginación reactiva (8 productos por página).
2. Panel de Gestión de Órdenes y Pedidos
Ruta protegida: /admin/orders (Componente: OrderManagementPage.jsx)
Estilos: 

OrderManagement.css
Listado de Ventas (OrderTable.jsx):
Tabla ordenada cronológicamente (más recientes primero) con ID de Orden, Cliente/Comprador (nombre, apellido y correo), Fecha, Total y Estado actual con badges diferenciados (draft, pending, confirmed, shipped, completed, cancelled).
Modal de Detalle de Orden (OrderDetailModal.jsx):
Desglose del carrito: Tabla detallada con cada producto adquirido, cantidad, precio unitario, subtotal y monto total destacado de la orden.
Objeto de envío accesible: Bloque destacado de despacho con desglose explícito de los campos street (Calle y altura), city (Ciudad/Localidad) y zip_code (Código Postal).
Cambio de Estado Dinámico: Dropdown selector interactivo (draft, pending, confirmed, shipped, completed, cancelled) que envía inmediatamente la petición PATCH /api/orders/:id/status al backend, actualiza el estado en memoria y notifica al usuario.
Buscador y Filtro: Búsqueda por nombre de cliente, correo o Nº de orden, y filtro por estado del pedido con paginación integrada.
3. Seguridad, Protección de Rutas y Navegación
Guarda de Autenticación (AdminRoute.jsx):
Valida la presencia del rol 'admin' tanto en el contexto de React (AuthContext.jsx) como en localStorage o sessionStorage.
Si un usuario no autorizado intenta ingresar, se renderiza una pantalla con estética M&L informando el acceso restringido, junto con botones para iniciar sesión como administrador o simular sesión de prueba con 1 clic.
Integración en Router y Navegación:
Actualizado 
router.jsx
 con las rutas /admin/products y /admin/orders protegidas.
Actualizado el menú desplegable de navegación en AdminPanel.jsx y Menu.jsx para mostrar los accesos al administrador logueado.
Sincronización con Backend Node/Express:
Incorporadas las rutas GET /api/orders y PATCH /api/orders/:id/status en orderRoutes.js y orderController.js, además de soporte para procesamiento de imágenes con Multer en productController.js.
