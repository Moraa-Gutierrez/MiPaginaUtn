import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './cards.css'

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

            <p className="stock" style={{ fontSize: '14px', color: '#666' }}>
              Stock: {product.quantity} u.
            </p>

            {(product.highlighted === true || product.highlighted === "true") && (
              <p className="destacado">
                ★ Producto destacado
              </p>
            )}

            <div className="botones" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href="#" className="btn btn-secundario" style={{ fontSize: '1rem', padding: '6px' }}>Detalle</a>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-primario" 
                  style={{ fontSize: '1rem', padding: '6px' }}
                >
                  Carrito
                </button>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to={`/edit-product/${product.id}`} className="btn" style={{ fontSize: '1rem', padding: '6px', backgroundColor: '#b79067', color: 'white', textDecoration: 'none' }}>Editar</Link>
                {onDelete && (
                  <button onClick={() => onDelete(product.id)} className="btn" style={{ fontSize: '1rem', padding: '6px', backgroundColor: '#d9534f', color: 'white' }}>Eliminar</button>
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
