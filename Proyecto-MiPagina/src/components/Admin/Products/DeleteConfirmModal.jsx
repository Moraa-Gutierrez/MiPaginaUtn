import React from 'react';
import '../../../Css/Admin/ProductManagement.css';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&auto=format&fit=crop&q=80";

function DeleteConfirmModal({ isOpen, onClose, onConfirm, product, deleting }) {
    if (!isOpen || !product) return null;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    return (
        <div className="admin-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="admin-modal-dialog small" onClick={(e) => e.stopPropagation()}>
                
                <div className="admin-modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                    <button 
                        type="button" 
                        className="admin-modal-close" 
                        onClick={onClose} 
                        aria-label="Cerrar modal"
                    >
                        &times;
                    </button>
                </div>

                <div className="admin-modal-body" style={{ paddingTop: '0.5rem' }}>
                    <div className="delete-confirm-box">
                        <div className="delete-confirm-icon">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>

                        <h3 className="delete-confirm-title">¿Eliminar este producto?</h3>
                        <p className="delete-confirm-desc">
                            Esta acción quitará el producto del catálogo de la tienda de forma permanente.
                        </p>

                        <div className="delete-confirm-item-card">
                            <img
                                src={product.image || DEFAULT_IMAGE}
                                alt={product.name}
                                className="delete-confirm-thumb"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = DEFAULT_IMAGE;
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: 700, color: '#464d5d', fontSize: '0.95rem' }}>
                                    {product.name}
                                </div>
                                <div style={{ color: '#b79067', fontWeight: 600, fontSize: '0.88rem' }}>
                                    {formatCurrency(product.price)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="admin-modal-footer" style={{ justifyContent: 'center' }}>
                    <button
                        type="button"
                        className="admin-btn-outline"
                        onClick={onClose}
                        disabled={deleting}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="admin-btn-danger"
                        onClick={() => onConfirm(product._id || product.id)}
                        disabled={deleting}
                    >
                        {deleting ? (
                            <>
                                <span className="admin-spinner"></span>
                                <span>Eliminando...</span>
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-trash-can"></i>
                                <span>Eliminar definitivamente</span>
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default DeleteConfirmModal;
