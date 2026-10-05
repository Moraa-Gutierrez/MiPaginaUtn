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