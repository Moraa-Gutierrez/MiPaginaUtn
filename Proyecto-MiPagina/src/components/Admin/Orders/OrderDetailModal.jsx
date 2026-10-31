import React, { useState, useEffect } from 'react';
import '../../../Css/Admin/OrderManagement.css';

const STATUS_OPTIONS = [
    { value: "draft", label: "Borrador (Draft)", badgeClass: "order-status-draft" },
    { value: "pending", label: "Pendiente (Pending)", badgeClass: "order-status-pending" },
    { value: "confirmed", label: "Confirmado (Confirmed)", badgeClass: "order-status-confirmed" },
    { value: "shipped", label: "Enviado (Shipped)", badgeClass: "order-status-shipped" },
    { value: "completed", label: "Completado (Completed)", badgeClass: "order-status-completed" },
    { value: "cancelled", label: "Cancelado (Cancelled)", badgeClass: "order-status-cancelled" }
];

function OrderDetailModal({ isOpen, onClose, order, onStatusChange, updating }) {
    if (!isOpen || !order) return null;

    const [currentStatus, setCurrentStatus] = useState(order.status || "pending");

    useEffect(() => {
        if (order) {
            setCurrentStatus(order.status || "pending");
        }
    }, [order]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Fecha no registrada";
        try {
            return new Intl.DateTimeFormat('es-AR', {
                dateStyle: 'long',
                timeStyle: 'short'
            }).format(new Date(dateString));
        } catch {
            return dateString;
        }
    };

    const handleSelectStatus = async (e) => {
        const nextStatus = e.target.value;
        setCurrentStatus(nextStatus);
        const orderId = order._id || order.id;
        if (onStatusChange) {
            await onStatusChange(orderId, nextStatus);
        }
    };

    const orderId = order._id || order.id || "ORD-000";
    const displayId = order.order_number || `#ORD-${orderId.slice(-6).toUpperCase()}`;
    const buyer = order.user_id || {};
    const items = Array.isArray(order.items) ? order.items : [];
    const shipping = order.shipping || null;

    return (
        <div className="admin-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="admin-modal-dialog large" onClick={(e) => e.stopPropagation()}>
                
                {/* Cabecera del Modal */}
                <div className="admin-modal-header">
                    <h2 className="admin-modal-title">
                        <i className="fa-solid fa-receipt"></i>
                        Detalle del Pedido: {displayId}
                    </h2>
                    <button 
                        type="button" 
                        className="admin-modal-close" 
                        onClick={onClose}
                        aria-label="Cerrar modal"
                    >
                        &times;
                    </button>
                </div>

                <div className="admin-modal-body">
                    <div className="order-detail-grid">

                        {/* Banner Superior con CAMBIO DE ESTADO DINÁMICO */}
                        <div className="order-detail-header-card">
                            <div className="order-detail-meta">
                                <h3>Orden {displayId}</h3>
                                <span>
                                    <i className="fa-regular fa-calendar"></i> Registrada el {formatDate(order.created_at || order.createdAt)}
                                </span>
                            </div>

                            {/* Dropdown / Selector para Cambio de Estado Dinámico */}
                            <div className="order-status-controller">
                                <span className="status-control-label">
                                    <i className="fa-solid fa-arrows-rotate"></i> Actualizar Estado:
                                </span>
                                <select
                                    className="order-status-select"
                                    value={currentStatus}
                                    onChange={handleSelectStatus}
                                    disabled={updating}
                                    aria-label="Cambiar estado de la orden"
                                >
                                    {STATUS_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                {updating && <span className="admin-spinner dark"></span>}
                            </div>
                        </div>

                        {/* Datos del Comprador */}
                        <div className="order-customer-card">
                            <h4 className="section-subtitle">
                                <i className="fa-solid fa-user"></i> Datos del Comprador
                            </h4>
                            <div className="customer-details-grid">
                                <div className="detail-item">
                                    <span className="detail-item-label">Nombre Completo</span>
                                    <span className="detail-item-val">
                                        {buyer.name ? `${buyer.name} ${buyer.lastname || ''}`.trim() : "Usuario Invitado / No especificado"}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-item-label">Email de Contacto</span>
                                    <span className="detail-item-val">
                                        {buyer.email || "No registrado"}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-item-label">Rol del Usuario</span>
                                    <span className="detail-item-val">
                                        {buyer.role || "Cliente"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* OBJETO DE ENVÍO DESPLEGADO DE FORMA ACCESIBLE */}
                        <div className="shipping-info-card">
                            <h4 className="section-subtitle">
                                <i className="fa-solid fa-location-dot"></i> Dirección y Datos de Envío
                            </h4>
                            {shipping ? (
                                <div className="shipping-address-box">
                                    <div className="shipping-field">
                                        <span className="shipping-field-label">Calle y Número (Street)</span>
                                        <span className="shipping-field-value">
                                            {shipping.street || "Sin especificar"}
                                        </span>
                                    </div>
                                    <div className="shipping-field">
                                        <span className="shipping-field-label">Ciudad / Localidad (City)</span>
                                        <span className="shipping-field-value">
                                            {shipping.city || "Sin especificar"}
                                        </span>
                                    </div>
                                    <div className="shipping-field">
                                        <span className="shipping-field-label">Código Postal (Zip Code)</span>
                                        <span className="shipping-field-value">
                                            {shipping.zip_code || "Sin código postal"}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <p style={{ margin: '8px 0 0 0', color: '#717784', fontSize: '0.92rem' }}>
                                    <i className="fa-solid fa-circle-info"></i> Esta orden se encuentra en estado inicial o retiro por local; aún no se han registrado datos domiciliarios de despacho.
                                </p>
                            )}
                        </div>

                        {/* DESGLOSE DEL CARRITO */}
                        <div className="order-cart-breakdown">
                            <h4 className="section-subtitle">
                                <i className="fa-solid fa-basket-shopping"></i> Desglose de Artículos Comprados
                            </h4>

                            {items.length === 0 ? (
                                <p style={{ color: '#717784', fontSize: '0.92rem', padding: '1rem 0' }}>
                                    No se registran ítems detallados para este pedido.
                                </p>
                            ) : (
                                <>
                                    <div className="admin-table-responsive">
                                        <table className="breakdown-table">
                                            <thead>
                                                <tr>
                                                    <th>Artículo</th>
                                                    <th style={{ textAlign: 'center' }}>Cant.</th>
                                                    <th style={{ textAlign: 'right' }}>Precio Unit.</th>
                                                    <th style={{ textAlign: 'right' }}>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item, idx) => {
                                                    const unitPrice = item.unit_price || item.price || 0;
                                                    const qty = item.quantity || 1;
                                                    const subtotal = unitPrice * qty;

                                                    return (
                                                        <tr key={idx}>
                                                            <td>
                                                                <div className="cart-item-name-cell">
                                                                    <div className="cart-item-icon">
                                                                        <i className="fa-solid fa-box"></i>
                                                                    </div>
                                                                    <span style={{ fontWeight: 600 }}>
                                                                        {item.product_name || item.name || "Producto M&L"}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td style={{ textAlign: 'center', fontWeight: 600 }}>
                                                                {qty}
                                                            </td>
                                                            <td style={{ textAlign: 'right', color: '#717784' }}>
                                                                {formatCurrency(unitPrice)}
                                                            </td>
                                                            <td style={{ textAlign: 'right', fontWeight: 700, color: '#b79067' }}>
                                                                {formatCurrency(subtotal)}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Resumen Total */}
                                    <div className="order-summary-footer">
                                        <div className="order-total-badge-box">
                                            <span>Monto Total de la Orden:</span>
                                            <span className="order-total-amount-highlight">
                                                {formatCurrency(order.total_amount)}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>

                {/* Pie del Modal */}
                <div className="admin-modal-footer">
                    <button type="button" className="admin-btn-secondary" onClick={onClose}>
                        Cerrar Detalle
                    </button>
                </div>

            </div>
        </div>
    );
}

export default OrderDetailModal;
