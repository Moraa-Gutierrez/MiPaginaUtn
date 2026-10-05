import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import "../Css/Elementos/Cards.css";
import ProductCardItem from './cards/ProductCardItem';
import ProductModal from './cards/ProductModal';
import ToastNotification from './cards/ToastNotification';
import EmptyState from './cards/EmptyState';

function ProductCard({ products, onDelete, isPreview }) {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product);
    }
    showToast(`¡${product.name || 'Producto'} añadido al carrito! 🛒`, 'success');
  };

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (!products || products.length === 0) {
    return (
      <section className="cards-wrapper">
        <EmptyState />
      </section>
    );
  }

  return (
    <section className="cards-wrapper">
      <div className="cards">
        {products.map((product, index) => (
          <ProductCardItem
            key={product.id || index}
            product={product}
            onDelete={onDelete}
            isPreview={isPreview}
            onOpenDetails={handleOpenDetails}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Modal interactivo de Detalles del producto */}
      <ProductModal
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
        isPreview={isPreview}
      />

      {/* Notificaciones Toast elegantes */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />
    </section>
  );
}

export default ProductCard;