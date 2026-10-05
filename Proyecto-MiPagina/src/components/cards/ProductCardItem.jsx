import React from 'react';
import { Link } from 'react-router-dom';

function ProductCardItem({ product, onDelete, isPreview, onOpenDetails, onAddToCart }) {
  const getCategoryName = (categoryId) => {
    switch (Number(categoryId)) {
      case 1: return "Perfumes";
      case 2: return "Accesorios";
      case 3: return "Velas";
      case 4: return "Cuidados Diarios";
      case 5: return "Figuras de Yeso y Cemento";
      default: return null;
    }
  };

  const isHighlighted = product.highlighted === true || product.highlighted === "true";
  const categoryName = getCategoryName(product.category_id);
  const hasMaterial = product.material && Number(product.category_id) === 5;

  return (
    <article className="tarjeta">
      <div className="tarjeta-imagen">
        <img 
          src={product.image || "https://picsum.photos/300/300"} 
          alt={product.name || "Producto"} 
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/400x400?text=Sin+Imagen";
          }}
        />
        {isHighlighted && (
          <span className="destacado-badge">
            ★ Destacado
          </span>
        )}
      </div>

      <div className="tarjeta-cuerpo">
        {categoryName && (
          <p className="categoria-tag">
            {categoryName}
          </p>
        )}

        {hasMaterial && (
          <p className="material-tag">
            Material: {product.material}
          </p>
        )}

        <h3 className="titulo">{product.name || "Nombre del producto"}</h3>

        <p className="descripcion" title={product.description}>
          {product.description || "Sin descripción disponible..."}
        </p>

        <div className="tarjeta-info-meta">
          <p className="precio">${product.price || 0}</p>
          <span className="stock-info">Stock: {product.quantity || 0} u.</span>
        </div>

        <div className="contenedor-botones-tarjeta">
          {/* Acciones del Cliente */}
          <div className="fila-botones fila-botones-cliente">
            {isPreview ? (
              <>
                <button type="button" onClick={() => onOpenDetails(product)} className="btn btn-secundario">
                  <i className="fa-regular fa-eye"></i> Detalle
                </button>
                <span className="btn btn-primario">
                  <i className="fa-solid fa-cart-shopping"></i> Carrito
                </span>
              </>
            ) : (
              <>
                <button 
                  type="button" 
                  onClick={() => onOpenDetails(product)} 
                  className="btn btn-secundario"
                >
                  <i className="fa-regular fa-eye"></i> Detalle
                </button>
                <button 
                  type="button" 
                  onClick={() => onAddToCart(product)} 
                  className="btn btn-primario"
                >
                  <i className="fa-solid fa-cart-shopping"></i> Carrito
                </button>
              </>
            )}
          </div>

          {/* Acciones del Administrador */}
          <div className="fila-botones fila-botones-admin">
            {isPreview ? (
              <>
                <span className="btn btn-admin-disabled">
                  <i className="fa-solid fa-pen"></i> Editar
                </span>
                <span className="btn btn-admin-disabled">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </span>
              </>
            ) : (
              <>
                <Link to={`/edit-product/${product.id}`} className="btn btn-editar">
                  <i className="fa-solid fa-pen"></i> Editar
                </Link>
                {onDelete && (
                  <button 
                    type="button" 
                    onClick={() => onDelete(product.id)} 
                    className="btn btn-eliminar"
                  >
                    <i className="fa-solid fa-trash"></i> Eliminar
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCardItem;
