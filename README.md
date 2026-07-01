# Proyecto Mi Página

Proyecto web desarrollado con React y Vite para presentar productos de cosmética y estilo de vida, con navegación por categorías, carrito, login/registro y una API local para simular datos.

## ✨ Características

- Página principal con diseño atractivo y responsive
- Secciones para accesorios, velas, perfumes y cuidados diarios
- Vista de productos y detalle de cada artículo
- Carrito de compras
- Formularios de inicio de sesión y registro
- Panel administrativo para gestionar productos
- API local con JSON Server

## 🛠️ Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Bootstrap
- JSON Server
- CSS modularizado

## 📁 Estructura del proyecto

- Proyecto-MiPagina/: frontend principal en React
- Server/server/: servidor local con JSON Server y base de datos mock
- css/, html/, img/: recursos del proyecto base anterior

## ▶️ Cómo ejecutar el proyecto

### 1) Instalar dependencias del frontend

```bash
cd Proyecto-MiPagina
npm install
```

### 2) Iniciar la app frontend

```bash
npm run dev
```

La aplicación quedará disponible en el puerto por defecto de Vite.

### 3) Iniciar la API local

Abrí una segunda terminal y ejecutá:

```bash
cd Server/server
npm install
npm run dev
```

La API quedará disponible en:

```text
http://localhost:3000
```

## 📦 Scripts disponibles

Dentro de la carpeta Proyecto-MiPagina:

- npm run dev: inicia el entorno de desarrollo
- npm run build: genera la build de producción
- npm run preview: previsualiza la build
- npm run lint: revisa el código con ESLint

## 👤 Notas

Este proyecto combina una versión moderna en React con una estructura previa de HTML/CSS, por lo que se pueden encontrar recursos en varias carpetas del repositorio.

Si querés, también puedo dejarte una versión más elegante del README con portada, capturas y un apartado de “Cómo contribuir”.
