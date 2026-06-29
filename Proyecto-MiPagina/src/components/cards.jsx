import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useGetProductById from '../hooks/products/useGetProductById';
import "../Css/Elementos/Cards.css"

function ProductCard({ products, onDelete,isPreview }) {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    window.alert(`¡${product.name} añadido al carrito! 🛒`);
  };

 if (isPreview) {
    return (
      <>
        {products.map((product) => (
          <article className="tarjeta" key={product.id || 'preview'}>
            <div className="tarjeta-imagen">
              <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} />
            </div>

            <div className="tarjeta-cuerpo">
              <h3 className="titulo">{product.name || "Nombre del producto"}</h3>
              
              <p className="descripcion">
                {product.description || "Aquí aparecerá la descripción..."}
              </p>

              <p className="categoria-tag">
                {product.category_id === 1 && "Perfumes"}
                {product.category_id === 2 && "Accesorios"}
                {product.category_id === 3 && "Velas"}
                {product.category_id === 4 && "Cuidados Diarios"}
              </p>

              <p className="precio">${product.price || 0}</p>
              <p className="stock">Stock: {product.quantity || 0} u.</p>

              <div className="contenedor-botones-tarjeta">
                {/* Piso 1: Botones simulados de usuario */}
                <div className="fila-botones">
                  <span className="btn btn-secundario">Detalle</span>
                  <span className="btn btn-primario">Carrito</span>
                </div>
                {/* Piso 2: Botones bloqueados de administración */}
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
      {products.map((product) => (
        <article className="tarjeta" key={product.id}>
          <div className="tarjeta-imagen">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="tarjeta-cuerpo">
            <h3 className="titulo">{product.name}</h3>
            
            <p className="descripcion">{product.description}</p>

            <p className="categoria-tag">
              {product.category_id === 1 && "Perfumes"}
              {product.category_id === 2 && "Accesorios"}
              {product.category_id === 3 && "Velas"}
              {product.category_id === 4 && "Cuidados Diarios"}
            </p>

            <p className="precio">${product.price}</p>
            <p className="stock">Stock: {product.quantity} u.</p>

            {(product.highlighted === true || product.highlighted === "true") && (
              <p className="destacado">★ Producto destacado</p>
            )}

            <div className="contenedor-botones-tarjeta">
              {/* Piso 1: Botones del Cliente */}
              <div className="fila-botones">
                <a href="#" className="btn btn-secundario">Detalle</a>
                <button onClick={() => handleAddToCart(product)} className="btn btn-primario">
                  Carrito
                </button>
              </div>
              
              {/* Piso 2: Botones del Administrador */}
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
