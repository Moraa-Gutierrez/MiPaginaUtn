import React, { useState, useMemo } from 'react';
import useAdminOrders from '../../hooks/admin/useAdminOrders';
import AdminNavTabs from '../../components/Admin/AdminNavTabs';
import OrderTable from '../../components/Admin/Orders/OrderTable';
import OrderDetailModal from '../../components/Admin/Orders/OrderDetailModal';
import '../../Css/Admin/OrderManagement.css';

const STATUS_FILTERS = [
    { value: "all", label: "Todos los Estados" },
    { value: "draft", label: "Borradores (Draft)" },
    { value: "pending", label: "Pendientes (Pending)" },
    { value: "confirmed", label: "Confirmados (Confirmed)" },
    { value: "shipped", label: "Enviados (Shipped)" },
    { value: "completed", label: "Completados (Completed)" },
    { value: "cancelled", label: "Cancelados (Cancelled)" }
];

const ITEMS_PER_PAGE = 8;

function OrderManagementPage() {
    const {
        orders,
        loading,
        updating,
        error,
        toast,
        clearToast,
        updateOrderStatus,
        fetchOrders
    } = useAdminOrders();

    // Filtros y Búsqueda
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);

    // Modal de Detalle de Orden
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    // Filtrar y ordenar Órdenes por Fecha descendente
    const filteredOrders = useMemo(() => {
        const list = orders.filter((order) => {
            const term = searchTerm.trim().toLowerCase();

            // Buscar por ID de orden, nombre de comprador o email
            const orderNum = (order.order_number || "").toLowerCase();
            const orderId = (order._id || order.id || "").toLowerCase();
            const buyerName = order.user_id 
                ? `${order.user_id.name || ''} ${order.user_id.lastname || ''}`.toLowerCase()
                : "";
            const buyerEmail = (order.user_id?.email || "").toLowerCase();

            const matchesSearch = !term ||
                orderNum.includes(term) ||
                orderId.includes(term) ||
                buyerName.includes(term) ||
                buyerEmail.includes(term);

            // Filtro por Estado
            const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });

        // Ordenar por fecha descendente (más recientes primero)
        return list.sort((a, b) => {
            const dateA = new Date(a.created_at || a.createdAt || 0).getTime();
            const dateB = new Date(b.created_at || b.createdAt || 0).getTime();
            return dateB - dateA;
        });
    }, [orders, searchTerm, selectedStatus]);

    // Paginación
    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) || 1;
    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredOrders, currentPage]);

    // Ver Detalle
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedOrder(null);
    };

    // Cambio dinámico de estado
    const handleStatusChange = async (orderId, newStatus) => {
        const res = await updateOrderStatus(orderId, newStatus);
        if (res?.success) {
            // Actualizar la orden activa en el modal si está abierto
            setSelectedOrder(prev => prev && (prev._id || prev.id) === orderId ? { ...prev, status: newStatus } : prev);
        }
    };

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedStatus("all");
        setCurrentPage(1);
    };

    return (
        <div className="admin-view-container">
            <div className="admin-wrapper">

                {/* Banner de Encabezado */}
                <div className="admin-header-banner">
                    <div className="admin-header-info">
                        <h1 className="admin-title">Gestión de Órdenes</h1>
                        <p className="admin-subtitle">
                            Visualizá todas las compras realizadas, consultá los datos de envío y actualizá el estado de los pedidos en tiempo real.
                        </p>
                    </div>

                    <div className="admin-header-actions">
                        <button
                            type="button"
                            className="admin-btn-secondary"
                            onClick={fetchOrders}
                            disabled={loading}
                            title="Recargar listado de pedidos"
                        >
                            <i className="fa-solid fa-rotate-right"></i>
                            Actualizar
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
                            placeholder="Buscar por cliente, email o Nº de orden..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            id="admin-order-search"
                        />
                    </div>

                    {/* Filtro por Estado */}
                    <div className="admin-filters-group">
                        <select
                            className="admin-select"
                            value={selectedStatus}
                            onChange={(e) => {
                                setSelectedStatus(e.target.value);
                                setCurrentPage(1);
                            }}
                            aria-label="Filtrar por estado del pedido"
                        >
                            {STATUS_FILTERS.map(f => (
                                <option key={f.value} value={f.value}>{f.label}</option>
                            ))}
                        </select>

                        {(searchTerm || selectedStatus !== "all") && (
                            <button
                                type="button"
                                className="admin-btn-outline"
                                onClick={resetFilters}
                                title="Limpiar filtros"
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
                        <p>Cargando órdenes y pedidos de venta...</p>
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div className="admin-empty-card" style={{ borderColor: '#dc3545' }}>
                        <div className="admin-empty-icon" style={{ color: '#dc3545' }}>
                            <i className="fa-solid fa-circle-exclamation"></i>
                        </div>
                        <h3 className="admin-empty-title">Hubo un problema al cargar los pedidos</h3>
                        <p className="admin-empty-desc">{error}</p>
                        <button type="button" className="admin-btn-primary" onClick={fetchOrders}>
                            <i className="fa-solid fa-rotate-right"></i> Reintentar
                        </button>
                    </div>
                )}

                {/* Tabla de Órdenes */}
                {!loading && !error && filteredOrders.length > 0 && (
                    <>
                        <OrderTable
                            orders={paginatedOrders}
                            onViewOrder={handleViewOrder}
                        />

                        {/* Paginación */}
                        <div className="admin-pagination">
                            <span className="admin-pagination-info">
                                Mostrando <strong>{paginatedOrders.length}</strong> de <strong>{filteredOrders.length}</strong> pedidos registrados
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
                {!loading && !error && filteredOrders.length === 0 && (
                    <div className="admin-empty-card">
                        <div className="admin-empty-icon">
                            <i className="fa-solid fa-receipt"></i>
                        </div>
                        <h3 className="admin-empty-title">No se encontraron órdenes registradas</h3>
                        <p className="admin-empty-desc">
                            {searchTerm || selectedStatus !== "all"
                                ? "No hay pedidos que coincidan con los filtros de búsqueda o estado seleccionados."
                                : "Actualmente no se registran compras confirmadas o carritos activos en la base de datos."}
                        </p>

                        {(searchTerm || selectedStatus !== "all") && (
                            <button type="button" className="admin-btn-secondary" onClick={resetFilters}>
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                )}

            </div>

            {/* Modal de Detalle de Orden */}
            <OrderDetailModal
                isOpen={isDetailModalOpen}
                onClose={handleCloseDetailModal}
                order={selectedOrder}
                onStatusChange={handleStatusChange}
                updating={updating}
            />

            {/* Notificaciones Toast */}
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

export default OrderManagementPage;
