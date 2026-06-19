import { useNavigate } from 'react-router-dom';
import './cards.css'

function ProductCard({ products }) {
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

            <div className="botones">
              <a href="#" className="btn btn-secundario">Detalle</a>
              <button className="btn btn-primario">Añadir al Carrito</button>
            </div>
          </div>

        </article>
      ))}
    </section>
  );
}

export default ProductCard;
