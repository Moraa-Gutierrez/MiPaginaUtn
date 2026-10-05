import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useGetProducts from '../hooks/products/useGetProduct';
import useGetProductsByCategory from '../hooks/products/useGetProductByCategory';
import ProductCard from '../components/Cards';
import { SkeletonGrid } from '../components/cards/SkeletonCard';
import useDeleteProducts from '../hooks/products/useDeleteProducts';
import { normalizeText } from '../components/Cards';
import "../Css/Products.css";

function Products() {
  const { category_id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const allProductsData = useGetProducts();
  const categoryProductsData = useGetProductsByCategory(category_id);

  const { error, products, loading, getProducts } = category_id 
    ? { 
        ...categoryProductsData, 
        getProducts: () => categoryProductsData.getProductsByCategory(category_id) 
      } 
    : allProductsData;

  const { deleteProducts } = useDeleteProducts();

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      const success = await deleteProducts(id);
      if (success) {
        getProducts();
      }
    }
  };

  // Filtrar productos activos y por búsqueda de texto
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const searchNormalized = normalizeText(searchTerm.trim());
    return products.filter(p => {
      const isActive = p.active !== false;
      const matchesSearch = searchTerm.trim() === '' || 
        (p.name && p.name.toLowerCase().includes(searchNormalized)) ||
        (p.description && p.description.toLowerCase().includes(searchNormalized));
      return isActive && matchesSearch;
    });
  }, [products, searchTerm]);

  return (
    <div className="catalog-page">
      <div className="catalog-container">
        
        {/* Encabezado elegante de Sección */}
        <header className="catalog-header">
          <h1 className="catalog-title">Nuestra Tienda</h1>
          <p className="catalog-subtitle">
            Explorá nuestra colección exclusiva de aromas, velas artesanales, accesorios elegantes y artículos de cuidado personal.
          </p>
          <hr className="catalog-divider" />
        </header>

        {/* Barra de Herramientas Superior: Solo Buscador */}
        <div className="catalog-toolbar">
          <div className="catalog-search-box">
            <i className="fa-solid fa-magnifying-glass catalog-search-icon"></i>
            <input
              type="text"
              className="catalog-search-input"
              placeholder="Buscar producto por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Contador discreto de resultados */}
        {!loading && !error && (
          <div className="catalog-results-count">
            Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
          </div>
        )}

        {/* Estado de Error */}
        {error && (
          <div className="empty-state-container" style={{ margin: '30px auto' }}>
            <div className="empty-state-icon" style={{ color: '#de3a3a' }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 className="empty-state-title" style={{ color: '#de3a3a' }}>Error al cargar</h3>
            <p className="empty-state-message">
              {error?.message || "Se produjo un problema al obtener los productos. Por favor recargá la página."}
            </p>
          </div>
        )}

        {/* Indicador de Carga Discreto (Skeleton Loader) */}
        {loading && <SkeletonGrid count={8} />}

        {/* Grilla Principal de Productos */}
        {!loading && !error && (
          <ProductCard products={filteredProducts} onDelete={handleDelete} />
        )}

      </div>
    </div>
  );
}

export default Products;