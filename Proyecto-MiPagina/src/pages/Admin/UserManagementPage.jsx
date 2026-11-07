import React, { useState, useMemo } from 'react';
import useAdminUsers from '../../hooks/admin/useAdminUsers';
import AdminNavTabs from '../../components/Admin/AdminNavTabs';
import UserTable from '../../components/Admin/Users/UserTable';
import '../../Css/Admin/OrderManagement.css';
import '../../Css/Admin/AdminShared.css';

const ROLE_FILTERS = [
    { value: "all", label: "Todos los Roles" },
    { value: "customer", label: "Clientes / Compradores" },
    { value: "admin", label: "Administradores (Admin)" }
];

const STATUS_FILTERS = [
    { value: "all", label: "Todos los Estados" },
    { value: "active", label: "Solo Activos" },
    { value: "inactive", label: "Solo Inactivos (Baja)" }
];

const ITEMS_PER_PAGE = 8;

function UserManagementPage() {
    const {
        users,
        loading,
        updating,
        error,
        toast,
        clearToast,
        updateUserRole,
        toggleUserStatus,
        fetchUsers
    } = useAdminUsers();

    // Filtros y Búsqueda
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);

    // Filtrar Usuarios
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const term = searchTerm.trim().toLowerCase();

            // Buscar por nombre, apellido, email o ID
            const fullName = `${user.name || ''} ${user.lastname || ''}`.toLowerCase();
            const email = (user.email || "").toLowerCase();
            const userId = (user._id || user.id || "").toLowerCase();

            const matchesSearch = !term ||
                fullName.includes(term) ||
                email.includes(term) ||
                userId.includes(term);

            // Filtro por Rol
            const userRole = (user.role || "comprador").toLowerCase();
            let matchesRole = true;
            if (selectedRole === "admin") {
                matchesRole = userRole === "admin";
            } else if (selectedRole === "customer") {
                matchesRole = userRole === "comprador" || userRole === "customer";
            }

            // Filtro por Estado
            const isActive = user.active !== false;
            let matchesStatus = true;
            if (selectedStatus === "active") {
                matchesStatus = isActive;
            } else if (selectedStatus === "inactive") {
                matchesStatus = !isActive;
            }

            return matchesSearch && matchesRole && matchesStatus;
        }).sort((a, b) => {
            const dateA = new Date(a.createdAt || a.created_at || a.date || 0).getTime();
            const dateB = new Date(b.createdAt || b.created_at || b.date || 0).getTime();
            return dateB - dateA;
        });
    }, [users, searchTerm, selectedRole, selectedStatus]);

    // Paginación
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedRole("all");
        setSelectedStatus("all");
        setCurrentPage(1);
    };

    // Métricas rápidas
    const metrics = useMemo(() => {
        const total = users.length;
        const admins = users.filter(u => (u.role || '').toLowerCase() === 'admin').length;
        const customers = total - admins;
        const inactives = users.filter(u => u.active === false).length;
        return { total, admins, customers, inactives };
    }, [users]);

    return (
        <div className="admin-view-container">
            <div className="admin-wrapper">

                {/* BANNER PRINCIPAL */}
                <div className="admin-header-banner">
                    <div className="admin-header-info">
                        <h1 className="admin-title">Gestión de Usuarios</h1>
                        <p className="admin-subtitle">
                            Administra los roles de acceso, estado de cuentas y permisos de clientes y administradores.
                        </p>
                    </div>

                    <div className="admin-header-actions">
                        <button
                            type="button"
                            className="admin-btn-secondary"
                            onClick={fetchUsers}
                            disabled={loading || updating}
                            title="Recargar datos del servidor"
                        >
                            <i className={`fa-solid fa-arrows-rotate ${loading ? 'fa-spin' : ''}`}></i>
                            {loading ? "Sincronizando..." : "Actualizar"}
                        </button>
                    </div>
                </div>

                {/* PESTAÑAS DE NAVEGACIÓN */}
                <AdminNavTabs />

                {/* CARDS DE RESUMEN / MÉTRICAS */}
                <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                    <div className="admin-stat-card" style={{ background: '#fff', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(70, 77, 93, 0.1)' }}>
                        <span style={{ fontSize: '0.85rem', color: '#717784', fontWeight: 600 }}>Total de Cuentas</span>
                        <h3 style={{ margin: '6px 0 0', color: '#464d5d', fontSize: '1.6rem' }}>{metrics.total}</h3>
                    </div>
                    <div className="admin-stat-card" style={{ background: '#fff', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(70, 77, 93, 0.1)' }}>
                        <span style={{ fontSize: '0.85rem', color: '#1565c0', fontWeight: 600 }}>Clientes (Customers)</span>
                        <h3 style={{ margin: '6px 0 0', color: '#1565c0', fontSize: '1.6rem' }}>{metrics.customers}</h3>
                    </div>
                    <div className="admin-stat-card" style={{ background: '#fff', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(70, 77, 93, 0.1)' }}>
                        <span style={{ fontSize: '0.85rem', color: '#5e35b1', fontWeight: 600 }}>Administradores</span>
                        <h3 style={{ margin: '6px 0 0', color: '#5e35b1', fontSize: '1.6rem' }}>{metrics.admins}</h3>
                    </div>
                    <div className="admin-stat-card" style={{ background: '#fff', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(70, 77, 93, 0.1)' }}>
                        <span style={{ fontSize: '0.85rem', color: '#c62828', fontWeight: 600 }}>Usuarios Inactivos</span>
                        <h3 style={{ margin: '6px 0 0', color: '#c62828', fontSize: '1.6rem' }}>{metrics.inactives}</h3>
                    </div>
                </div>

                {/* BARRA DE HERRAMIENTAS / FILTROS */}
                <div className="admin-toolbar-card">
                    <div className="admin-toolbar-row">
                        <div className="admin-search-wrapper">
                            <i className="fa-solid fa-magnifying-glass admin-search-icon"></i>
                            <input
                                type="text"
                                className="admin-search-input"
                                placeholder="Buscar por nombre, apellido, email o ID..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    className="admin-search-clear"
                                    onClick={() => setSearchTerm("")}
                                    aria-label="Limpiar búsqueda"
                                >
                                    &times;
                                </button>
                            )}
                        </div>

                        <div className="admin-filter-group">
                            <select
                                className="admin-select"
                                value={selectedRole}
                                onChange={(e) => {
                                    setSelectedRole(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                {ROLE_FILTERS.map((filter) => (
                                    <option key={filter.value} value={filter.value}>
                                        {filter.label}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="admin-select"
                                value={selectedStatus}
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                {STATUS_FILTERS.map((filter) => (
                                    <option key={filter.value} value={filter.value}>
                                        {filter.label}
                                    </option>
                                ))}
                            </select>

                            {(searchTerm || selectedRole !== "all" || selectedStatus !== "all") && (
                                <button
                                    type="button"
                                    className="admin-btn-secondary"
                                    onClick={resetFilters}
                                    title="Restablecer filtros"
                                >
                                    <i className="fa-solid fa-xmark"></i> Limpiar
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ERROR STATE */}
                {error && (
                    <div className="admin-error-card">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <span>{error}</span>
                        <button type="button" className="admin-btn-secondary" onClick={fetchUsers}>
                            Reintentar
                        </button>
                    </div>
                )}

                {/* LOADING STATE */}
                {loading && (
                    <div className="admin-loading-state">
                        <div className="admin-spinner dark"></div>
                        <p>Cargando usuarios registrados...</p>
                    </div>
                )}

                {/* TABLA DE USUARIOS */}
                {!loading && !error && filteredUsers.length > 0 && (
                    <>
                        <UserTable
                            users={paginatedUsers}
                            onRoleChange={updateUserRole}
                            onToggleStatus={toggleUserStatus}
                            updating={updating}
                        />

                        {/* PAGINACIÓN */}
                        <div className="admin-pagination-container">
                            <span className="pagination-info">
                                Mostrando {paginatedUsers.length} de {filteredUsers.length} usuarios
                            </span>

                            <div className="admin-pagination">
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
                                        className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
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

                {/* EMPTY STATE */}
                {!loading && !error && filteredUsers.length === 0 && (
                    <div className="admin-empty-card">
                        <div className="admin-empty-icon">
                            <i className="fa-solid fa-users"></i>
                        </div>
                        <h3 className="admin-empty-title">No se encontraron usuarios</h3>
                        <p className="admin-empty-desc">
                            {searchTerm || selectedRole !== "all" || selectedStatus !== "all"
                                ? "No hay usuarios que coincidan con los filtros o el término de búsqueda ingresado."
                                : "Actualmente no se registran usuarios en la base de datos."}
                        </p>

                        {(searchTerm || selectedRole !== "all" || selectedStatus !== "all") && (
                            <button type="button" className="admin-btn-secondary" onClick={resetFilters}>
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                )}

            </div>

            {/* TOAST FEEDBACK */}
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

export default UserManagementPage;

