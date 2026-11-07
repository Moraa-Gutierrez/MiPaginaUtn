import React from 'react';
import '../../../Css/Admin/AdminShared.css';
import '../../../Css/Admin/OrderManagement.css';

function UserTable({ users, onRoleChange, onToggleStatus, updating }) {
    if (!users || users.length === 0) {
        return null;
    }

    const formatDate = (dateString) => {
        if (!dateString) return "Fecha no registrada";
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
                            <th>Usuario / Cliente</th>
                            <th>Email</th>
                            <th>Fecha de Registro</th>
                            <th>Rol de Acceso</th>
                            <th>Estado</th>
                            <th style={{ textAlign: 'center', width: '180px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const userId = user._id || user.id || "USR-000";
                            const fullName = `${user.name || ''} ${user.lastname || ''}`.trim() || "Usuario sin nombre";
                            const email = user.email || "Sin email";
                            const role = (user.role || "comprador").toLowerCase();
                            const isAdmin = role === "admin";
                            const isActive = user.active !== false;
                            const registerDate = user.createdAt || user.created_at || user.date;

                            return (
                                <tr key={userId}>
                                    {/* Nombre de Usuario */}
                                    <td>
                                        <div className="customer-info-cell">
                                            <span className="customer-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <i className={isAdmin ? "fa-solid fa-user-shield" : "fa-regular fa-user"}></i>
                                                {fullName}
                                            </span>
                                            <small style={{ color: '#8c95a6' }}>ID: {userId.slice(-6).toUpperCase()}</small>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td>
                                        <span className="customer-email" style={{ fontSize: '0.95rem' }}>
                                            {email}
                                        </span>
                                    </td>

                                    {/* Fecha de Registro */}
                                    <td>
                                        <span className="order-date-cell">
                                            {formatDate(registerDate)}
                                        </span>
                                    </td>

                                    {/* Rol */}
                                    <td>
                                        <select
                                            className="order-status-select"
                                            style={{
                                                padding: '4px 8px',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                borderRadius: '6px',
                                                backgroundColor: isAdmin ? '#ede7f6' : '#e3f2fd',
                                                color: isAdmin ? '#5e35b1' : '#1565c0',
                                                borderColor: isAdmin ? '#d1c4e9' : '#bbdefb',
                                                cursor: 'pointer'
                                            }}
                                            value={isAdmin ? "admin" : "customer"}
                                            onChange={(e) => onRoleChange(userId, e.target.value)}
                                            disabled={updating}
                                            title="Cambiar rol del usuario"
                                        >
                                            <option value="customer">Cliente (Customer)</option>
                                            <option value="admin">Administrador (Admin)</option>
                                        </select>
                                    </td>

                                    {/* Estado */}
                                    <td>
                                        <span className={`admin-badge ${isActive ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                                            <i className={isActive ? "fa-solid fa-circle-check" : "fa-solid fa-ban"}></i>
                                            {isActive ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>

                                    {/* Acciones */}
                                    <td>
                                        <div className="table-actions-cell" style={{ justifyContent: 'center' }}>
                                            {/* Toggle Activo / Baja */}
                                            <button
                                                type="button"
                                                className={`admin-btn-${isActive ? 'secondary' : 'primary'} table-btn`}
                                                onClick={() => onToggleStatus(userId, !isActive)}
                                                disabled={updating}
                                                style={{ fontSize: '0.85rem', padding: '6px 10px' }}
                                                title={isActive ? "Dar de baja usuario" : "Reactivar usuario"}
                                            >
                                                <i className={isActive ? "fa-solid fa-user-xmark" : "fa-solid fa-user-check"}></i>
                                                {isActive ? "Dar Baja" : "Activar"}
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

export default UserTable;

