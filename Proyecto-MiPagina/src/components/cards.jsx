import React, { useState } from 'react';
import ProductCardItem from './cards/ProductCardItem';
import ProductModal from './cards/ProductModal';
import ToastNotification from './cards/ToastNotification';
import EmptyState from './cards/EmptyState';
import { useCart } from '../context/CartContext';
import "../Css/Elementos/Cards.css";

// Helper para ignorar acentos y mayúsculas en búsquedas
export const normalizeText = (text) => {
  if (!text || typeof text !== "string") return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

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
      showToast(`¡${product.name || "Producto"} agregado al carrito!`, 'success');
    }
  };

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="cards">
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

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
          isPreview={isPreview}
        />
      )}

      {toast && (
        <ToastNotification
          toast={toast}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}

export default ProductCard;