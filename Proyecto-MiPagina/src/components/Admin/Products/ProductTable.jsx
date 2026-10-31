import React from 'react';
import '../../../Css/Admin/ProductManagement.css';

const CATEGORY_NAMES = {
    1: "Perfumes",
    2: "Accesorios",
    3: "Velas",
    4: "Cuidados Diarios",
    5: "Figuras de Yeso y Cemento"
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&auto=format&fit=crop&q=80";

function ProductTable({ products, onEdit, onDelete }) {
    if (!products || products.length === 0) {
        return null;
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    const getStockBadge = (quantity) => {
        const qty = Number(quantity) || 0;
        if (qty <= 0) {
            return (
                <span className="stock-indicator out-of-stock">
                    <span className="stock-dot"></span> Agotado (0)
                </span>
            );
        }
        if (qty <= 3) {
            return (
                <span className="stock-indicator low-stock">
                    <span className="stock-dot"></span> Bajo ({qty} un.)
                </span>
            );
        }
        return (
            <span className="stock-indicator in-stock">
                <span className="stock-dot"></span> En stock ({qty})
            </span>
        );
    };

    return (
        <div className="admin-table-container">
            <div className="admin-table-responsive">
                <table className="admin-data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px', textAlign: 'center' }}>Imagen</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th style={{ textAlign: 'center', width: '120px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const pId = product._id || product.id;
                            const categoryName = CATEGORY_NAMES[product.category_id] || `Cat. ${product.category_id || 1}`;
                            const isFigureCategory = Number(product.category_id) === 5;

                            return (
                                <tr key={pId}>
                                    {/* Miniatura */}
                                    <td style={{ textAlign: 'center' }}>
                                        <img
                                            src={product.image || DEFAULT_IMAGE}
                                            alt={product.name}
                                            className="product-thumb-cell"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = DEFAULT_IMAGE;
                                            }}
                                        />
                                    </td>

                                    {/* Nombre y descripción */}
                                    <td>
                                        <div className="product-info-cell">
                                            <span className="product-name-title">{product.name}</span>
                                            {product.description && (
                                                <span className="product-desc-snippet" title={product.description}>
                                                    {product.description}
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Categoría y Variante */}
                                    <td>
                                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                                            <span className="admin-badge admin-badge-slate">
                                                {categoryName}
                                            </span>
                                            {isFigureCategory && product.material && (
                                                <span className="admin-badge admin-badge-gold">
                                                    <i className="fa-solid fa-shapes"></i> {product.material}
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Precio */}
                                    <td>
                                        <span className="product-price-cell">
                                            {formatCurrency(product.price)}
                                        </span>
                                    </td>

                                    {/* Stock */}
                                    <td>
                                        {getStockBadge(product.quantity)}
                                    </td>

                                    {/* Acciones */}
                                    <td style={{ textAlign: 'center' }}>
                                        <div className="table-actions-cell" style={{ justifyContent: 'center' }}>
                                            <button
                                                type="button"
                                                onClick={() => onEdit(product)}
                                                className="action-icon-btn edit"
                                                title="Editar producto"
                                                aria-label={`Editar ${product.name}`}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onDelete(product)}
                                                className="action-icon-btn delete"
                                                title="Eliminar producto"
                                                aria-label={`Eliminar ${product.name}`}
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductTable;
