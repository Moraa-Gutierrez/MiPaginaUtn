import React from 'react';
import '../../../Css/Admin/OrderManagement.css';

const STATUS_CONFIG = {
    draft: { label: "Borrador", className: "order-status-draft", icon: "fa-regular fa-file-lines" },
    pending: { label: "Pendiente", className: "order-status-pending", icon: "fa-regular fa-clock" },
    confirmed: { label: "Confirmado", className: "order-status-confirmed", icon: "fa-solid fa-check" },
    shipped: { label: "Enviado", className: "order-status-shipped", icon: "fa-solid fa-truck-fast" },
    completed: { label: "Completado", className: "order-status-completed", icon: "fa-solid fa-circle-check" },
    cancelled: { label: "Cancelado", className: "order-status-cancelled", icon: "fa-solid fa-ban" }
};

function OrderTable({ orders, onViewOrder }) {
    if (!orders || orders.length === 0) {
        return null;
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Fecha no disponible";
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        } catch {
            return dateString;
        }
    };

    return (
        <div className="admin-table-container">
            <div className="admin-table-responsive">
                <table className="admin-data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '130px' }}>ID de Orden</th>
                            <th>Cliente / Comprador</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado Actual</th>
                            <th style={{ textAlign: 'center', width: '110px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const orderId = order._id || order.id || "ORD-000";
                            const displayId = order.order_number || `#ORD-${orderId.slice(-6).toUpperCase()}`;
                            const customerName = order.user_id 
                                ? `${order.user_id.name || ''} ${order.user_id.lastname || ''}`.trim() || "Cliente Registrado"
                                : "Usuario no especificado";
                            const customerEmail = order.user_id?.email || "Sin email";
                            const status = order.status || "pending";
                            const statusMeta = STATUS_CONFIG[status] || { label: status, className: "order-status-pending", icon: "fa-solid fa-circle" };
                            const orderDate = order.created_at || order.createdAt;

                            return (
                                <tr key={orderId}>
                                    {/* ID de Orden */}
                                    <td>
                                        <span className="order-id-cell">
                                            {displayId}
                                        </span>
                                    </td>

                                    {/* Cliente */}
                                    <td>
                                        <div className="customer-info-cell">
                                            <span className="customer-name">{customerName}</span>
                                            <span className="customer-email">{customerEmail}</span>
                                        </div>
                                    </td>

                                    {/* Fecha */}
                                    <td>
                                        <span className="order-date-cell">
                                            {formatDate(orderDate)}
                                        </span>
                                    </td>

                                    {/* Total */}
                                    <td>
                                        <span className="order-total-cell">
                                            {formatCurrency(order.total_amount)}
                                        </span>
                                    </td>

                                    {/* Estado */}
                                    <td>
                                        <span className={`admin-badge ${statusMeta.className}`}>
                                            <i className={statusMeta.icon}></i> {statusMeta.label}
                                        </span>
                                    </td>

                                    {/* Acciones */}
                                    <td style={{ textAlign: 'center' }}>
                                        <button
                                            type="button"
                                            onClick={() => onViewOrder(order)}
                                            className="action-icon-btn view"
                                            title="Ver detalle completo de la orden"
                                            aria-label={`Ver orden ${displayId}`}
                                        >
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
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

export default OrderTable;
