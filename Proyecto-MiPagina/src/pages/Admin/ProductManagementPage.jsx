import React, { useState, useMemo } from 'react';
import useAdminProducts from '../../hooks/admin/useAdminProducts';
import AdminNavTabs from '../../components/Admin/AdminNavTabs';
import ProductTable from '../../components/Admin/Products/ProductTable';
import ProductFormModal from '../../components/Admin/Products/ProductFormModal';
import DeleteConfirmModal from '../../components/Admin/Products/DeleteConfirmModal';
import '../../Css/Admin/ProductManagement.css';

const CATEGORIES = [
    { id: "all", name: "Todas las Categorías" },
    { id: "1", name: "Perfumes" },
    { id: "2", name: "Accesorios" },
    { id: "3", name: "Velas" },
    { id: "4", name: "Cuidados Diarios" },
    { id: "5", name: "Figuras de Yeso y Cemento" }
];

const ITEMS_PER_PAGE = 8;

function ProductManagementPage() {
    const {
        products,
        loading,
        submitting,
        error,
        toast,
        clearToast,
        createProduct,
        updateProduct,
        deleteProduct,
        fetchProducts
    } = useAdminProducts();

    // Filtros y Búsqueda
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [stockFilter, setStockFilter] = useState("all");

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);

    // Estados de Modales
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Filtrar Productos
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // Filtro por texto (nombre o descripción)
            const term = searchTerm.trim().toLowerCase();
            const matchesSearch = !term ||
                (product.name && product.name.toLowerCase().includes(term)) ||
                (product.description && product.description.toLowerCase().includes(term));

            // Filtro por categoría
            const matchesCategory = selectedCategory === "all" ||
                String(product.category_id) === String(selectedCategory);

            // Filtro por stock
            let matchesStock = true;
            const qty = Number(product.quantity) || 0;
            if (stockFilter === "in-stock") matchesStock = qty > 3;
            else if (stockFilter === "low-stock") matchesStock = qty > 0 && qty <= 3;
            else if (stockFilter === "out-of-stock") matchesStock = qty <= 0;

            return matchesSearch && matchesCategory && matchesStock;
        });
    }, [products, searchTerm, selectedCategory, stockFilter]);

    // Paginación calculada
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    // Acciones de modal
    const handleOpenCreateModal = () => {
        setEditingProduct(null);
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setEditingProduct(product);
        setIsFormModalOpen(true);
    };

    const handleCloseFormModal = () => {
        setIsFormModalOpen(false);
        setEditingProduct(null);
    };

    const handleFormSubmit = async (formData) => {
        if (editingProduct) {
            const pId = editingProduct._id || editingProduct.id;
            return await updateProduct(pId, formData);
        } else {
            return await createProduct(formData);
        }
    };

    const handleOpenDeleteModal = (product) => {
        setDeletingProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingProduct(null);
    };

    const handleConfirmDelete = async (productId) => {
        const res = await deleteProduct(productId);
        if (res?.success) {
            handleCloseDeleteModal();
        }
    };

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
        setStockFilter("all");
        setCurrentPage(1);
    };

    return (
        <div className="admin-view-container">
            <div className="admin-wrapper">

                {/* Banner de Encabezado */}
                <div className="admin-header-banner">
                    <div className="admin-header-info">
                        <h1 className="admin-title">Gestión de Productos</h1>
                        <p className="admin-subtitle">
                            Administrá el catálogo de M&L: creá nuevos artículos, editá stock y precios o quitá productos.
                        </p>
                    </div>

                    <div className="admin-header-actions">
                        <button
                            type="button"
                            className="admin-btn-primary"
                            onClick={handleOpenCreateModal}
                            id="btn-create-product"
                        >
                            <i className="fa-solid fa-plus"></i>
                            Nuevo Producto
                        </button>
                    </div>
                </div>

                {/* Pestañas de Navegación del Panel */}
                <AdminNavTabs />

                {/* Barra de Herramientas y Filtros */}
                <div className="admin-toolbar-card">
                    {/* Buscador */}
                    <div className="admin-search-wrapper">
                        <i className="fa-solid fa-magnifying-glass admin-search-icon"></i>
                        <input
                            type="text"
                            className="admin-search-input"
                            placeholder="Buscar por nombre o descripción..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            id="admin-product-search"
                        />
                    </div>

                    {/* Grupo de Filtros Select */}
                    <div className="admin-filters-group">
                        <select
                            className="admin-select"
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCurrentPage(1);
                            }}
                            aria-label="Filtrar por categoría"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>

                        <select
                            className="admin-select"
                            value={stockFilter}
                            onChange={(e) => {
                                setStockFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            aria-label="Filtrar por disponibilidad"
                        >
                            <option value="all">Todo el Stock</option>
                            <option value="in-stock">En Stock (&gt;3)</option>
                            <option value="low-stock">Poco Stock (1-3)</option>
                            <option value="out-of-stock">Agotados (0)</option>
                        </select>

                        {(searchTerm || selectedCategory !== "all" || stockFilter !== "all") && (
                            <button
                                type="button"
                                className="admin-btn-outline"
                                onClick={resetFilters}
                                title="Limpiar todos los filtros"
                            >
                                <i className="fa-solid fa-rotate-left"></i> Limpiar
                            </button>
                        )}
                    </div>
                </div>

                {/* Estado de Carga */}
                {loading && (
                    <div className="admin-loading-state">
                        <div className="admin-spinner dark large"></div>
                        <p>Cargando catálogo de productos...</p>
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div className="admin-empty-card" style={{ borderColor: '#dc3545' }}>
                        <div className="admin-empty-icon" style={{ color: '#dc3545' }}>
                            <i className="fa-solid fa-circle-exclamation"></i>
                        </div>
                        <h3 className="admin-empty-title">Hubo un problema al cargar los productos</h3>
                        <p className="admin-empty-desc">{error}</p>
                        <button type="button" className="admin-btn-primary" onClick={fetchProducts}>
                            <i className="fa-solid fa-rotate-right"></i> Reintentar
                        </button>
                    </div>
                )}

                {/* Tabla Interactiva */}
                {!loading && !error && filteredProducts.length > 0 && (
                    <>
                        <ProductTable
                            products={paginatedProducts}
                            onEdit={handleOpenEditModal}
                            onDelete={handleOpenDeleteModal}
                        />

                        {/* Paginación */}
                        <div className="admin-pagination">
                            <span className="admin-pagination-info">
                                Mostrando <strong>{paginatedProducts.length}</strong> de <strong>{filteredProducts.length}</strong> productos
                            </span>

                            <div className="admin-pagination-controls">
                                <button
                                    type="button"
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    title="Página anterior"
                                >
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        className={`pagination-btn ${pageNumber === currentPage ? "active" : ""}`}
                                        onClick={() => setCurrentPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    title="Página siguiente"
                                >
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* ESTADO VACÍO (EMPTY STATE) */}
                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="admin-empty-card">
                        <div className="admin-empty-icon">
                            <i className="fa-solid fa-box-open"></i>
                        </div>
                        <h3 className="admin-empty-title">No se encontraron productos</h3>
                        <p className="admin-empty-desc">
                            {searchTerm || selectedCategory !== "all" || stockFilter !== "all"
                                ? "No hay artículos que coincidan con los filtros aplicados. Intentá modificando la búsqueda."
                                : "Aún no hay productos registrados en el catálogo. ¡Empezá publicando el primero!"}
                        </p>
                        
                        {searchTerm || selectedCategory !== "all" || stockFilter !== "all" ? (
                            <button type="button" className="admin-btn-secondary" onClick={resetFilters}>
                                Limpiar filtros
                            </button>
                        ) : (
                            <button type="button" className="admin-btn-primary" onClick={handleOpenCreateModal}>
                                <i className="fa-solid fa-plus"></i> Cargar Primer Producto
                            </button>
                        )}
                    </div>
                )}

            </div>

            {/* Modal de Alta y Edición de Producto */}
            <ProductFormModal
                isOpen={isFormModalOpen}
                onClose={handleCloseFormModal}
                onSubmit={handleFormSubmit}
                initialProduct={editingProduct}
                submitting={submitting}
            />

            {/* Modal de Confirmación de Borrado */}
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                product={deletingProduct}
                deleting={submitting}
            />

            {/* Feedback Visual Inmediato: Notificación Toast */}
            {toast && (
                <div className="admin-toast-container">
                    <div className={`admin-toast ${toast.type}`}>
                        <span className="admin-toast-message">
                            {toast.type === "success" && <i className="fa-solid fa-circle-check" style={{ color: '#2e7d32', marginRight: '6px' }}></i>}
                            {toast.type === "error" && <i className="fa-solid fa-circle-xmark" style={{ color: '#dc3545', marginRight: '6px' }}></i>}
                            {toast.message}
                        </span>
                        <button type="button" className="admin-toast-close" onClick={clearToast}>
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductManagementPage;
