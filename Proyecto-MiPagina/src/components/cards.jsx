import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import"../Css/Elementos/Cards.css"

function ProductCard({ products, onDelete }) {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    window.alert(`¡${product.name} añadido al carrito! 🛒`);
  };

  return (
    <section className="cards">

      {products.map((product) => (


        <article className="tarjeta" key={product.id}>

          <div className="tarjeta-imagen">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="tarjeta-cuerpo">
            <h3 className="titulo">
              {product.name}
            </h3>

            <p className="descripcion">
              {product.description}
            </p>

            <p className="precio">
              ${product.price}
            </p>

            <p className="stock" >
              Stock: {product.quantity} u.
            </p>

            {(product.highlighted === true || product.highlighted === "true") && (
              <p className="destacado">
                ★ Producto destacado
              </p>
            )}

            <div className="botones" >
              <div >
                <a href="#" className="btn btn-secundario" >Detalle</a>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-primario" 
                >
                  Carrito
                </button>
              </div>
              <div >
                <Link to={`/edit-product/${product.id}`} className="btn" >Editar</Link>
                {onDelete && (
                  <button onClick={() => onDelete(product.id)} className="btn" >Eliminar</button>
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
