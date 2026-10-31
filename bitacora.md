# 📝 Bitácora de Control - Proyecto M&L

**Etapa:** Subcategoría "Figuras de Yeso y Cemento"  
**Fecha:** 5 Octubre 2026  

---

### 1. Conexión y Hooks (`API_URL`)
* **Corrección de URLs:** Se corrigieron los enlaces en `useGetProducts`, `useGetProductById`, `usePatchProducts` y `useGetProductsByCategory` agregando la barra `/` correspondiente (`${API_URL}/products`).
* **Manejo de Errores:** Se emprolijó el lanzamiento de excepciones con `new Error()` para capturar el estado real HTTP y resguardar la pantalla ante fallos de carga.

### 2. Base de Datos (`db.json`)
* **ID Unificado:** Se asignó el `category_id: 5` para todas las figuras de yeso y cemento.
* **Tipos de Datos:** Se convirtieron los `category_id` a tipo número puro (sin comillas) para garantizar la compatibilidad con los filtros de `json-server`.
* **Propiedad Nueva:** Se agregó la clave `"material": "yeso"` o `"cemento"` en cada registro de esta categoría.

### 3. Formularios (`Agregar` y `Editar`)
* **Campo Dinámico:** Se configuró el selector de `material` para que **solo se despliegue** cuando la categoría seleccionada sea "Figuras de Yeso y Cemento" (`category_id: 5`).
* **Carga Limpia:** En la edición de productos se precarga el material de la figura. En productos de otras categorías (ej. perfumes) el campo permanece oculto.

### 4. Tarjetas de Producto (`Cards.jsx`)
* **Etiqueta en Tienda:** Se incorporó el renderizado del material (`Material: Yeso/Cemento`) en la vista del catálogo público.
* **Vista Previa en Vivo:** Se sincronizó la tarjeta `isPreview` para reflejar los cambios de material en tiempo real mientras se crea o edita un producto.
* **Casting Seguro:** Se aplicó `Number(product.category_id) === 5` en las comparaciones para evitar fallos entre textos y números.

🎨 Resumen del Rediseño y Mejoras Implementadas
1. # Eliminación Total de window.alert y Nueva UI/UX Profesional
Sistema de Notificaciones Toast (ToastNotification.jsx): Sustituye las alertas nativas al añadir al carrito. Presenta animaciones fluidas de entrada (slideIn), temporizador visual de auto-cierre y un diseño que respeta los colores de la marca (#464d5d, #b79067).
Modal Interactivo de Detalle (ProductModal.jsx): Al presionar "Detalle", en lugar de lanzar una alerta de texto, se despliega un panel modal centrado con fondo con efecto blur (backdrop-filter). Muestra la imagen completa en alta definición, badges de categoría y material, precio destacado, stock disponible, descripción estructurada y botón directo de compra.
2. # Modularización y Estructura de Componentes
El componente monolítico original ha sido descompuesto en subcomponentes limpios y mantenibles dentro de src/components/cards/:

cards.jsx (Componente contenedor principal que maneja los estados de Modal y Toast)


ProductCardItem.jsx
 (Tarjeta individual de producto)


ProductModal.jsx
 (Modal de detalles interactivo)


ToastNotification.jsx
 (Sistema de alertas emergentes)


EmptyState.jsx
 (Estado vacío estructurado cuando una categoría no contiene productos)
3. # Maquetación con Grilla CSS Adaptable (Responsive Grid)
Layout adaptable: 1 columna en móviles (<600px), 2 columnas en tablets (600px - 900px), 3 columnas en laptops (900px - 1200px) y 4 columnas en monitores de escritorio (>1200px), con gap: 25px uniforme.
Simetría y Proporciones: Se fijó la proporción de imagen (aspect-ratio: 4 / 3 con object-fit: cover) e igualación de alturas para evitar descuadres entre tarjetas con descripciones cortas o largas.
4. # Alineación y Separación Visual de Acciones (Cliente vs Admin)
Alineación Inferior: margin-top: auto en la botonera garantiza que todos los botones queden perfectamente alineados en el fondo de las tarjetas.
Separación de roles:
Acciones del Cliente (.fila-botones-cliente): Botones prominentes para "Detalle" (borde y texto dorado) y "Carrito" (fondo dorado con sombra suave).
Herramientas del Administrador (.fila-botones-admin): Agrupadas en una barra inferior diferenciada en tono oscuro con botones claros para "Editar" y "Eliminar" (rojo carmesí #de3a3a).
5. # Microinteracciones y Respeto de la Identidad de Marca
Animaciones y Microinteracciones: Elevación de tarjeta al hacer hover (transform: translateY(-6px)), sombras dinámicas profundas, resaltado de borde dorado y zoom suave en las imágenes.
Identidad de Marca intacta: Se mantuvieron de forma estricta los tonos #464d5d, #b79067, #a47f56, #ffffff, #de3a3a, y las fuentes tipográficas "Arimo" y "Great Vibes".
Lógica de negocio preservada: Soporte total para la Categoría 5 ("Figuras de Yeso y Cemento") con el campo de material y compatibilidad completa para el modo isPreview en el panel de administración.
📄 Archivos Modificados y Creados


Cards.css


cards.jsx


ProductCardItem.jsx


ProductModal.jsx


ToastNotification.jsx


EmptyState.jsx
🌟 Resumen de Cambios y Mejoras Aplicadas
🚨  1. Corrección Crítica en Vista Previa (CreateProductPage y EditProductPage)
Proporciones e Identidad de Tarjeta Real: Se corrigió el contenedor de vista previa (isPreview). Se fijaron dimensiones mínimas (min-width: 310px, max-width: 360px) y relativas para evitar que la tarjeta se achique, se deforme o se apriete.
Espaciado y Mantenibilidad: La tarjeta en vista previa mantiene exactamente la misma tipografía, badges, badges de material (para la categoría 5 "Figuras de Yeso y Cemento"), precios y botones deshabilitados que una tarjeta real dentro de la tienda.
Layout Balanceado en 2 Columnas: Se organizaron las vistas en un diseño de grilla en dos columnas (grid-template-columns: minmax(0, 1fr) 360px; gap: 40px). La columna de vista previa cuenta con comportamiento sticky (position: sticky; top: 24px) para permanecer visible al deslizar el formulario en escritorio, y se apila de forma prolija en dispositivos móviles.
🛒 2. Rediseño Elegante del Catálogo de Productos (Products.jsx)
Encabezado Sobrio y Fino (.catalog-header): Título "Nuestra Tienda" jerarquizado en tipografía Great Vibes, acompañado de un subtítulo discreto en Arimo y una línea divisora en tono dorado #b79067.
Barra de Herramientas Horizontal (.catalog-toolbar):
Contenedor horizontal refinado con fondo translúcido, bordes finos y sombra suave.
Buscador Dinámico por Texto: Campo de entrada con icono flotante para buscar productos por nombre o descripción en tiempo real.
Filtros Rápidos por Categoría: Selector de botones (pills) por categoría (Todas las categorías, Perfumes, Accesorios, Velas, Cuidados Diarios, Figuras de Yeso y Cemento), con el estado activo resaltado en dorado.
Indicador de Carga Discreto (SkeletonCard.jsx): Se integraron tarjetas Skeleton Loader con animación de pulso (shimmer) que sustituyen los mensajes de carga en texto plano durante la obtención de datos desde la API.
Estado Vacío Estructurado (EmptyState.jsx): Cuando la búsqueda o filtro no arroja productos, se presenta un contenedor prolijo con icono temático e instrucciones.
🔒 3. Respeto Estricto de Restricciones
Página Home Intacta: No se realizó ninguna modificación en los estilos ni componentes de la página Home.
Branding e Identidad: Se mantuvieron estrictamente los colores originales de la marca (#464d5d, #b79067, #a47f56, #ffffff, #de3a3a) y las familias tipográficas.
CSS Puro: Todos los estilos están entregados en CSS puro sin dependencias externas adicionales.

#### Actualizacion Bitacora
14 de octubre

1. # Estructura y Arquitectura del Servidor
Organización de Carpetas: Se diseñó y estructuró el proyecto bajo una arquitectura modular profesional, separando responsabilidades en directorios específicos: config/, controllers/, middleware/, models/, routes/, services/, test/ y utils/.

Configuración del Servidor: Inicialización de Node.js con Express y configuración de middlewares esenciales (cors para la comunicación con el frontend de React y express.json() para el manejo de payloads JSON).

2. # Capa de Datos y Persistencia (MongoDB & Mongoose)
Conexión a Base de Datos (config/db.js): Implementación del módulo de conexión asincrónica utilizando Mongoose para vincular la aplicación con la base de datos de MongoDB.

Definición de Modelos (Schemas):

Product: Esquema robusto para el catálogo del e-commerce, contemplando nombre, descripción, precio, stock, imagen, category_id y la propiedad condicional material (específica para soportar la Categoría 5: "Figuras de Yeso y Cemento").

User: Modelo de usuarios con gestión de roles (comprador y admin) y campos obligatorios de seguridad e identificación.

Cart: Modelo relacional vinculado por referencias (ObjectId) para la gestión del carrito de compras por usuario.

3. # Script de Poblado de Datos (seed.js)
Se desarrolló un script de automatización para la base de datos (npm run seed) que realiza lo siguiente:

Limpieza y vaciado seguro de colecciones (Cart, Product, User) de afuera hacia adentro para mantener la integridad referencial.

Sincronización automática de índices únicos (syncIndexes).

Inserción masiva de datos iniciales representativos del negocio (productos de perfumería, accesorios, velas, cuidados diarios y el catálogo de figuras con materiales específicos).

Creación de usuarios de prueba iniciales (perfil comprador y perfil administrador con sus credenciales correspondientes).

## Resumen actual 15/10

Resumen de Avances del Proyecto 
# 1 Diseño y Modelado de la Base de Datos (NoSQL / MongoDB)

Se diseñó la estructura relacional/documental para el e-commerce M&L utilizando dbdiagram.io.

Se definieron tres colecciones principales con sus respectivos tipos de datos y restricciones:

# users: 
Para la gestión de cuentas (clientes y administradores) con campos como name, lastname, email (único), date, password, active y role.

# products:
 Con control de stock, precios numéricos y categorías embebidas para productos de perfumería, cuidados diarios, velas, accesorios y figuras de yeso/cemento.

# orders: 
Diseñada con una referencia al usuario (user_id), estados de la orden (draft, pending, confirmed, shipped), un array de items (que guarda el snapshot de los productos al momento de la compra para evitar inconsistencias si cambian de precio o se eliminan) y un objeto embebido shipping para los datos de envío.

# 2 Estructura Inicial del Backend (Node.js & Express)

Se configuró el servidor básico con Express, incorporando los middlewares esenciales como cors y express.json().

Se programó la conexión a la base de datos utilizando Mongoose (db.js), asegurando el manejo de errores y la lectura de la URI de MongoDB desde la configuración del entorno.

# 3 Preparación de Datos de Prueba (Seeds)

Se estructuraron los scripts de inicialización (seed.js / seed_2.js) para poblar automáticamente la base de datos con usuarios de prueba (incluyendo roles administrativos y de clientes) y productos reales adaptados al catálogo del emprendimiento familiar.

Se contempló la correcta sincronización de índices únicos (como los emails de los usuarios) y el borrado ordenado de colecciones de afuera hacia adentro antes de cada inserción.

# 4 Lógica de Servicios y Helpers

Se adaptaron funciones lógicas esenciales para el backend, como:

El servicio de verificación de existencia de usuarios utilizando el método .exists() de Mongoose.

La función de mapeo de datos públicos de usuario (dataPublicUser) para enviar al frontend únicamente información segura y filtrada, omitiendo datos sensibles como las contraseñas.

## 19 de octubre Resumen para la Bitácora — Módulo de Órdenes y Carrito (M&L)
## Capa de Servicios (orderService.js):
Implementación del patrón de "Carrito como Borrador" (status: 'draft') utilizando una única colección en MongoDB.   Programación de la lógica de stock atómico mediante operadores $gte y $inc para prevenir condiciones de carrera (race conditions).  
 Incorporación de un bloque de compensación (rollback) en el checkout para restablecer el stock automáticamente en caso de errores de transacción.   Cálculo seguro de los montos totales en el servidor utilizando métodos .reduce().  
  Capa de Controladores (orderController.js):Conexión entre los endpoints HTTP de Express y los servicios de negocio.Extracción segura del ID de usuario directamente desde el token JWT (req.usuario.id) para evitar vulnerabilidades de manipulación en el cliente.
  Manejo estandarizado de respuestas JSON y derivación de errores hacia el middleware centralizado.Capa de Enrutamiento (orderRoutes.js)Definición de endpoints limpios para el carrito (/cart, /items), el proceso de compra (/checkout), y el historial de compras (/my-orders).   Protección de rutas mediante middlewares de autenticación (verificarToken) y validación de privilegios según roles (permitirRoles(ROLES.COMPRADOR)).

  21 de octubre
 ## Estructura y Servidor: 
 Se configuró correctamente el punto de entrada principal del servidor (src/index.js) y su integración con la conexión a la base de datos y la arquitectura modular de Express.

## Gestión de Módulos y Dependencias:
 Se instalaron las dependencias necesarias (bcryptjs) y se corrigieron las rutas de importación de archivos de configuración y middlewares (config.js, subirImagen.js).

## Depuración y Corrección de Código: 
Se practicó el análisis de errores de consola para resolver conflictos de sintaxis (como imports duplicados en productRoutes.js).

## Documentación API (Swagger): 
Se definieron y adaptaron los schemas de componentes (Productos, Usuarios, Carrito/Órdenes) orientados al e-commerce de M&L Beauty.

## Entorno de Desarrollo: 
Se configuró exitosamente el script de ejecución con recarga automática (npm run dev) en el package.json.

Resumen 28 de octubre
## 1. Módulo de Almacenamiento e Imágenes (storage)supabase.js: 
Se corrigió la importación innecesaria del módulo node:inspector.   Se agregó la importación de la función nombreUnico desde ./nombreUnico.js.Se pulió la lógica de subida al bucket de Supabase utilizando file.buffer, especificando el contentType y obteniendo la URL pública con bucket().getPublicUrl(nombre).   Se mantuvo la función de borrado para remover archivos del bucket mediante el nombre extraído de la URL.   
## 2. Configuración de Rutas de Autenticación (authRoutes.js): 
Se definió el router con los endpoints /registro, /login y la ruta protegida /perfil mediante el middleware verificarToken.   Se solucionó un error de ruta no encontrada (404) añadiendo la exportación por defecto del router (export default router;) al final del archivo.
## 3. Depuración del Servidor y DependenciasConexión entre Servicios:
 Se resolvió el error de sintaxis en authService.js al corregir el nombre e importación de las funciones exportadas desde userService.js (buscarUsuarioPorEmail).   Levantamiento del Servidor: Se confirmó el correcto inicio del servidor Node.js corriendo en el puerto 3000 con la conexión activa a la base de datos MongoDB ("M&L").  
 ## 4. Validación en PostmanPrueba de Enrutamiento:
  Se validó que el middleware de autenticación bloquea correctamente las rutas protegidas devolviendo un estado 401 Unauthorized si no se envía el header Authorization.   Control de Excepciones: Se identificó que las peticiones POST a /api/auth/login sin cuerpo (Body) desencadenaban un error 500 ("Faltan el email y/o la contraseña"), confirmando la necesidad de enviar siempre el payload estructurado en JSON. 
  Resumen de Avances – Backend M&L Beauty
## Módulo: Autenticación, Autorización y Carrito de Compras (/api/orders)

## Estado: Resuelto y Verificado ✅

## 📌 Problemas Identificados y Soluciones
# Estructura del JWT y Mapeo de Rol:

## Problema: 
Al acceder a las rutas protegidas del carrito (/api/orders/cart), el middleware permitirRoles devolvía 403 Forbidden ("No tienes permisos para realizar esta acción").

## Causa:
 En la función de firma del token (jwt.sign), la clave del rol no coincidía exactamente con la lectura del middleware verificarToken y con el valor definido en ROLES.COMPRADOR ('comprador').

# Solución: 
Se alineó el payload del JWT en authService.js para enviar { id: usuario._id, role: usuario.role }, garantizando la coincidencia exacta con el esquema y los middlewares.

## Formato de Headers en Postman:

## Problema:
 Errores 401 Unauthorized por header mal estructurado ("Token no proporcionado" / "Token inválido").

# Solución: 
Se corrigió el envío del header Authorization. Al usar el tipo Bearer Token en la pestaña Authorization de Postman, se debe ingresar únicamente el hash del token (sin anteponer manualmente la palabra Bearer), para evitar la duplicación de prefijos.

🧪 Verificación Completa del Flujo
Registro e Inicio de Sesión:

POST /api/auth/registro -> Registro exitoso.

POST /api/auth/login -> Generación correcta del JWT con los datos del usuario y rol comprador.

Ruta Protegida del Carrito:

GET /api/orders/cart con header Authorization: Bearer <token> -> Status 200 OK.

Retorna exitosamente el objeto del carrito en estado draft, asociado al user_id correspondiente y listo para la adición de ítems
Se han diseñado e implementado con éxito los dos (2) paneles de administración para el e-commerce de M&L, respetando rigurosamente la identidad visual, tipografías (Great Vibes, Arimo), paleta de colores (#464d5d, #b79067, #c1a78e), maquetado estructurado y estilos en CSS puro (.css) sin librerías externas de UI.

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
Confirmación de borrado (

DeleteConfirmModal.jsx
):
Modal preventivo que detalla la miniatura y el nombre del producto antes de ejecutar el borrado permanente.
Buscador y Paginación: Búsqueda en vivo por nombre/descripción, filtro select por categoría, filtro por estado de stock y paginación reactiva (8 productos por página).
2. Panel de Gestión de Órdenes y Pedidos
Ruta protegida: /admin/orders (Componente: 

OrderManagementPage.jsx
)
Estilos: 

OrderManagement.css
Listado de Ventas (

OrderTable.jsx
):
Tabla ordenada cronológicamente (más recientes primero) con ID de Orden, Cliente/Comprador (nombre, apellido y correo), Fecha, Total y Estado actual con badges diferenciados (draft, pending, confirmed, shipped, completed, cancelled).
Modal de Detalle de Orden (

OrderDetailModal.jsx
):
Desglose del carrito: Tabla detallada con cada producto adquirido, cantidad, precio unitario, subtotal y monto total destacado de la orden.
Objeto de envío accesible: Bloque destacado de despacho con desglose explícito de los campos street (Calle y altura), city (Ciudad/Localidad) y zip_code (Código Postal).
Cambio de Estado Dinámico: Dropdown selector interactivo (draft, pending, confirmed, shipped, completed, cancelled) que envía inmediatamente la petición PATCH /api/orders/:id/status al backend, actualiza el estado en memoria y notifica al usuario.
Buscador y Filtro: Búsqueda por nombre de cliente, correo o Nº de orden, y filtro por estado del pedido con paginación integrada.
3. Seguridad, Protección de Rutas y Navegación
Guarda de Autenticación (

AdminRoute.jsx
):
Valida la presencia del rol 'admin' tanto en el contexto de React (

AuthContext.jsx
) como en localStorage o sessionStorage.
Si un usuario no autorizado intenta ingresar, se renderiza una pantalla con estética M&L informando el acceso restringido, junto con botones para iniciar sesión como administrador o simular sesión de prueba con 1 clic.
Integración en Router y Navegación:
Actualizado 

router.jsx
 con las rutas /admin/products y /admin/orders protegidas.
Actualizado el menú desplegable de navegación en 

AdminPanel.jsx
 y 

Menu.jsx
 para mostrar los accesos al administrador logueado.
Sincronización con Backend Node/Express:
Incorporadas las rutas GET /api/orders y PATCH /api/orders/:id/status en 

orderRoutes.js
 y 

orderController.js
, además de soporte para procesamiento de imágenes con Multer en 

productController.js
.