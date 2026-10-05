import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useGetProductById from '../hooks/products/useGetProductById';
import "../Css/Elementos/Cards.css";

function ProductCard({ products, onDelete, isPreview }) {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    window.alert(`¡${product.name} añadido al carrito! 🛒`);
  };

  const handleShowDetails = (product) => {
    window.alert(
      `✨ ${product.name} ✨\n\n` +
      `Descripción: ${product.description}\n\n` +
      `Precio: $${product.price}\n` +
      `Stock disponible: ${product.quantity} u.`
    );
  };

  if (isPreview) {
    return (
      <>
        {products.map((product) => (
          <article className="tarjeta" key={product.id || 'preview'}>
            <div className="tarjeta-imagen">
              <img src={product.image || "https://picsum.photos/200/300"} alt={product.name} />
            </div>

            <div className="tarjeta-cuerpo">
              <h3 className="titulo">{product.name || "Nombre del producto"}</h3>

              <p className="descripcion">
                {product.description || "Aquí aparecerá la descripción..."}
              </p>

              <p className="categoria-tag">
                {Number(product.category_id) === 1 && "Perfumes"}
                {Number(product.category_id) === 2 && "Accesorios"}
                {Number(product.category_id) === 3 && "Velas"}
                {Number(product.category_id) === 4 && "Cuidados Diarios"}
                {Number(product.category_id) === 5 && "Figuras de Yeso y Cemento"}
              </p>

              {product.material && Number(product.category_id) === 5 && (
                <p className="material-tag">
                  Material: {product.material}
                </p>
              )}
            
              <p className="precio">${product.price || 0}</p>
              <p className="stock">Stock: {product.quantity || 0} u.</p>

              <div className="contenedor-botones-tarjeta">
                <div className="fila-botones">
                  <span className="btn btn-secundario">Detalle</span>
                  <span className="btn btn-primario">Carrito</span>
                </div>
                <div className="fila-botones">
                  <span className="btn btn-admin-disabled">Editar</span>
                  <span className="btn btn-admin-disabled">Eliminar</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </>
    );
  }

  return (
    <section className="cards">
      {products.map((product, index) => (
        <article className="tarjeta" key={product.id || index}>
          <div className="tarjeta-imagen">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="tarjeta-cuerpo">
            <h3 className="titulo">{product.name}</h3>

            <p className="descripcion">{product.description}</p>

            <p className="categoria-tag">
              {Number(product.category_id) === 1 && "Perfumes"}
              {Number(product.category_id) === 2 && "Accesorios"}
              {Number(product.category_id) === 3 && "Velas"}
              {Number(product.category_id) === 4 && "Cuidados Diarios"}
              {Number(product.category_id) === 5 && "Figuras de Yeso y Cemento"}
            </p>

           
            {product.material && Number(product.category_id) === 5 && (
              <p className="material-tag">
                Material: {product.material}
              </p>
            )}

            <p className="precio">${product.price}</p>
            <p className="stock">Stock: {product.quantity} u.</p>

            {(product.highlighted === true || product.highlighted === "true") && (
              <p className="destacado">★ Producto destacado</p>
            )}

            <div className="contenedor-botones-tarjeta">
              <div className="fila-botones">
                <button onClick={() => handleShowDetails(product)} className="btn btn-secundario">Detalle</button>
                <button onClick={() => handleAddToCart(product)} className="btn btn-primario">
                  Carrito
                </button>
              </div>

              <div className="fila-botones">
                <Link to={`/edit-product/${product.id}`} className="btn btn-editar">Editar</Link>
                {onDelete && (
                  <button onClick={() => onDelete(product.id)} className="btn btn-eliminar">Eliminar</button>
                )}
              </div>
            </div>

          </div>
        </article>
      ))}
    </section>
  );
}

export default ProductCard;