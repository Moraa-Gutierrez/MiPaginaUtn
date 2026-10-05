import React, { useEffect } from 'react';

function ProductModal({ product, onClose, onAddToCart, isPreview }) {
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [product, onClose]);

  if (!product) return null;

  const getCategoryName = (categoryId) => {
    switch (Number(categoryId)) {
      case 1: return "Perfumes";
      case 2: return "Accesorios";
      case 3: return "Velas";
      case 4: return "Cuidados Diarios";
      case 5: return "Figuras de Yeso y Cemento";
      default: return "Producto";
    }
  };

  const hasMaterial = product.material && Number(product.category_id) === 5;
  const isHighlighted = product.highlighted === true || product.highlighted === "true";

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal-close" onClick={onClose} aria-label="Cerrar modal">
          &times;
        </button>

        <div className="product-modal-grid">
          <div className="product-modal-image-container">
            <img 
              src={product.image || "https://picsum.photos/400/400"} 
              alt={product.name || "Producto"} 
              className="product-modal-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/400x400?text=Sin+Imagen";
              }}
            />
            {isHighlighted && (
              <span className="destacado-badge-modal">
                ★ Producto Destacado
              </span>
            )}
          </div>

          <div className="product-modal-details">
            <div className="product-modal-tags">
              <span className="categoria-tag">
                {getCategoryName(product.category_id)}
              </span>
              {hasMaterial && (
                <span className="material-tag">
                  Material: {product.material}
                </span>
              )}
            </div>

            <h2 className="product-modal-title">{product.name || "Nombre del producto"}</h2>
            
            <div className="product-modal-price-stock">
              <span className="precio-modal">${product.price || 0}</span>
              <span className="stock-badge-modal">
                Stock: {product.quantity || 0} u.
              </span>
            </div>

            <div className="product-modal-description-box">
              <h4 className="description-label">Descripción:</h4>
              <p className="descripcion-modal">
                {product.description || "Sin descripción disponible."}
              </p>
            </div>

            <div className="product-modal-actions">
              {!isPreview ? (
                <button 
                  type="button"
                  className="btn btn-primario btn-modal-cart"
                  onClick={() => {
                    if (onAddToCart) onAddToCart(product);
                    onClose();
                  }}
                >
                  <i className="fa-solid fa-cart-shopping" style={{ marginRight: '8px' }}></i>
                  Añadir al Carrito
                </button>
              ) : (
                <span className="btn btn-admin-disabled">
                  Modo Vista Previa
                </span>
              )}
              <button type="button" className="btn btn-secundario" onClick={onClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
