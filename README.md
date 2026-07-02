# 🌸 M&L Beauty - Proyecto E-commerce (React + JSON Server)

Bienvenido a la documentación de **M&L Beauty**, una plataforma web de e-commerce dedicada a la venta de perfumes, bijouterie/accesorios, velas aromáticas y productos de cuidado personal. Este proyecto utiliza React en el frontend, ruteo dinámico, estados compartidos y un servidor simulado (JSON Server) que actúa como base de datos local.

---

## 🚀 Guía de Inicio Rápido

Para poner en marcha el proyecto completo, es necesario ejecutar tanto el servidor API como la aplicación cliente React de manera simultánea.

### 1. Requisitos Previos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

### 2. Levantar el Servidor de Datos (Mock API)
El servidor utiliza **JSON Server** para simular una base de datos RESTful sobre el archivo `db.json`.

```bash
# Navegar a la carpeta del servidor
cd Server/server

# Instalar dependencias
npm install

# Iniciar el servidor en el puerto 3000
npm run dev
```
*El servidor se iniciará en `http://localhost:3000/`. Podrás ver las colecciones de datos en `/products`, `/category` y `/user`.*

### 3. Levantar la Aplicación Frontend (React)
La aplicación cliente está construida con **Vite** y **React**.

```bash
# Navegar a la carpeta del proyecto
cd Proyecto-MiPagina

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```
*Vite levantará la aplicación en un puerto local (habitualmente `http://localhost:5173/`). Abre esta dirección en tu navegador para ver la web.*

---

## 🛠️ Stack Tecnológico Utilizado

1. **Frontend**:
   - **React 19**: Biblioteca principal para la construcción de interfaces de usuario interactivas basadas en componentes.
   - **React Router DOM v7**: Manejo de ruteo declarativo del lado del cliente, navegación de una sola página (SPA) sin recargas.
   - **React Bootstrap & Bootstrap 5**: Utilizado para componentes visuales como el menú desplegable de administración y carruseles.
   - **Vanilla CSS**: Estilos personalizados adaptados para una estética premium con paleta de colores cohesiva y diseño responsivo.
2. **Backend / API**:
   - **JSON Server**: Simulación ligera de una base de datos de producción mediante operaciones HTTP (GET, POST, PUT, PATCH, DELETE) sobre un archivo estructurado `db.json`.
3. **Persistencia / Sesión**:
   - **sessionStorage**: Almacenamiento local temporal para mantener la sesión del usuario iniciada.
   - **localStorage**: Almacenamiento persistente en disco para conservar el carrito de compras del usuario incluso si cierra la pestaña.

---

## 🗂️ Estructura del Proyecto

A continuación se detalla la arquitectura de directorios del proyecto React (`Proyecto-MiPagina/src`):

- **`/assets`**: Recursos estáticos como imágenes del carrusel, logotipos y fotos de marcas colaboradoras.
- **`/components`**:
  - `Cards.jsx`: Tarjetas de visualización de productos en la tienda, con soporte para vistas normales y vistas previas.
  - `Carrousel.jsx`: Carrusel animado integrado en la página principal.
  - `Layout/`: Estructura general de la página (Header, Footer, Menú).
- **`/context`**:
  - `CartContext.jsx`: Contexto global para la manipulación del carrito (agregar, remover, actualizar cantidad, vaciar y totalizar).
  - `AuthContext.jsx` *[NUEVO]*: Contexto global para administrar la sesión de usuario y la visibilidad de opciones restringidas.
- **`/hooks`**:
  - `/products`: Custom hooks para el catálogo (`useGetProduct`, `useGetProductByCategory`, `useGetProductById`, `usePostProduct`, `usePatchProducts`, `useDeleteProducts`, `useDiscontinueProduct`).
  - `/user`: Custom hooks para gestión de usuarios (`useLoginUser`, `useRegisterUser`).
- **`/pages`**: Páginas principales mapeadas en el ruteador (`Home`, `Products`, `QuienesSomos`, `ContactPage`, `CartPage`, `Login`, `Register`, `AdminPanel`).
- **`/Css`**: Estilos CSS organizados de forma modular por componentes y páginas.
- **`router.jsx`**: Archivo de configuración central de rutas de la aplicación web.

---

## ✍️ Cambios y Correcciones Realizadas

Se han corregido errores de programación y de lógica del negocio para garantizar un funcionamiento fluido y robusto en producción:

1. **Corrección de Error de Carga en Creación de Productos**:
   - Se solucionó un `ReferenceError` provocado por la variable no definida `textoImagen` al renderizar la vista previa de la tarjeta en `CreateProductPage.jsx`. Se reemplazó por un fallback de imagen estático y seguro.
2. **Enlaces de Navegación del Catálogo**:
   - En `Home.jsx`, los links del catálogo apuntaban a identificadores de texto (ej. `category/perfumes`) en lugar de los IDs numéricos (`category/1`) definidos en la base de datos y en las rutas de React. Se corrigieron todas las redirecciones.
3. **Ruta del Botón "Comenzar Ahora"**:
   - Se ajustó el enlace del héroe principal (`/registrarse` -> `/register`) para evitar una pantalla 404 al hacer clic.
4. **Firma y Flujo de Login corregidos**:
   - `useLoginUser.jsx` ahora procesa correctamente las credenciales sin importar si se reciben como argumentos individuales o agrupadas en un objeto de formulario.
   - En `Login.jsx` se eliminaron los campos de "Nombre" y "Apellido" de la interfaz de login, dejando únicamente "Email" y "Contraseña".
5. **Creación del Contexto de Autenticación (`AuthContext.jsx`)**:
   - Se centralizó el estado del usuario conectado. El menú de navegación (`Menu.jsx`) ahora se actualiza dinámicamente:
     - Muestra un saludo personalizado ("Hola, [Nombre] 👋") y un botón para **Cerrar Sesión**.
     - Oculta los accesos a Registro/Login al autenticarse.
     - Protege el menú de **Administración (Admin)** ocultándolo si el usuario es un visitante no registrado.
6. **Optimización de Recargas en Single Page App (SPA)**:
   - Se sustituyeron etiquetas `href` directas en `Register.jsx` y `AdminPanel.jsx` por componentes `<Link>` de `react-router-dom` para prevenir que la aplicación recargue toda la página web y limpie el estado del carrito o sesión.
7. **Control del Refresco tras Eliminar Productos**:
   - En `Products.jsx` se corrigió el flujo de eliminación. Ahora, si se elimina un producto estando dentro de una categoría filtrada (ej. Velas), la lista recarga únicamente esa categoría y no expone el catálogo completo.
8. **Productos Inactivos**:
   - Se añadió un filtro en el frontend para ocultar productos cuyo estado sea `active: false` (productos descontinuados), logrando un comportamiento de borrado lógico (soft delete).
9. **Detalle del Producto**:
   - Se dotó de funcionalidad al botón de "Detalle" de la tarjeta del producto (`Cards.jsx`), mostrando la información extendida y existencias del artículo en un cuadro emergente amigable.
10. **Corrección CSS Grid en Quiénes Somos**:
    - Se solucionó un conflicto de layout causado por una clase duplicada (`div11` duplicado en lugar de `div12`) en `QuienesSomos.jsx`.

---

## 💡 ¿Qué más se puede agregar en el futuro? (Sugerencias)

Para continuar escalando el proyecto, te sugiero las siguientes implementaciones:

1. **Roles de Usuario (Admin vs. Cliente)**:
   - Añadir una propiedad `role` (ej. `"admin"` o `"customer"`) a los datos de usuario en `db.json`. Restringir el acceso a las páginas de CRUD `/create-product` y `/edit-product/:id` mediante rutas protegidas (`ProtectedRoute`) para que solo entren verdaderos administradores.
2. **Pasarela de Pago Simulada**:
   - Integrar un modal interactivo en la finalización de compra dentro de `CartPage.jsx` para que el usuario pueda ingresar datos simulados de tarjeta de crédito/débito en lugar de usar un simple `window.alert()`.
3. **Buscador de Productos y Filtro de Precio**:
   - Añadir un cuadro de búsqueda (input text) en `Products.jsx` para buscar productos por nombre o descripción en tiempo real, junto con un control deslizante (slider) para filtrar por precio máximo/mínimo.
4. **Persistencia del Carrito en el Servidor**:
   - Actualmente, el carrito se guarda localmente en `localStorage`. Una mejora significativa sería almacenar el carrito en la API asociada al ID del usuario autenticado, de modo que sus productos elegidos no se pierdan al cambiar de dispositivo.
5. **Paginación y Lazy Loading**:
   - Si el catálogo crece a cientos de productos, implementar paginación mediante query params (`?_page=1&_limit=12`) asistido por JSON Server para acelerar el tiempo de carga del sitio.
