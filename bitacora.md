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

La función de mapeo de datos públicos de usuario (datosPublicosUsuario) para enviar al frontend únicamente información segura y filtrada, omitiendo datos sensibles como las contraseñas.

## 19 de octubre Resumen para la Bitácora — Módulo de Órdenes y Carrito (M&L)
## Capa de Servicios (orderService.js):
Implementación del patrón de "Carrito como Borrador" (status: 'draft') utilizando una única colección en MongoDB.   Programación de la lógica de stock atómico mediante operadores $gte y $inc para prevenir condiciones de carrera (race conditions).  
 Incorporación de un bloque de compensación (rollback) en el checkout para restablecer el stock automáticamente en caso de errores de transacción.   Cálculo seguro de los montos totales en el servidor utilizando métodos .reduce().  
  Capa de Controladores (orderController.js):Conexión entre los endpoints HTTP de Express y los servicios de negocio.Extracción segura del ID de usuario directamente desde el token JWT (req.usuario.id) para evitar vulnerabilidades de manipulación en el cliente.
  Manejo estandarizado de respuestas JSON y derivación de errores hacia el middleware centralizado.Capa de Enrutamiento (orderRoutes.js)Definición de endpoints limpios para el carrito (/cart, /items), el proceso de compra (/checkout), y el historial de compras (/my-orders).   Protección de rutas mediante middlewares de autenticación (verificarToken) y validación de privilegios según roles (permitirRoles(ROLES.COMPRADOR)).