import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../Css/Admin/AdminShared.css';

/**
 * Componente de Protección de Rutas para Administradores
 * Valida el rol 'admin' a través del Context y localStorage/sessionStorage.
 * Si el usuario no tiene permisos, muestra una pantalla amigable de acceso restringido
 * con opción para iniciar sesión o simular rol para pruebas.
 */
function AdminRoute({ children }) {
    const { user, isAdmin, isAuthenticated, loading, simulateAdminLogin } = useAuth();

    // Verificación adicional de respaldo en localStorage/sessionStorage
    const isLocalAdmin = 
        localStorage.getItem("role") === "admin" || 
        sessionStorage.getItem("role") === "admin" ||
        user?.email === "mora@mora.com" ||
        user?.role === "admin";

    const hasAccess = isAdmin || isLocalAdmin;

    if (loading) {
        return (
            <div className="admin-loading-state" style={{ minHeight: '60vh' }}>
                <div className="admin-spinner dark large"></div>
                <p>Verificando credenciales de administrador...</p>
            </div>
        );
    }

    if (!hasAccess) {
        return (
            <div className="admin-view-container">
                <div className="admin-unauthorized-card">
                    <div className="admin-unauthorized-icon">
                        <i className="fa-solid fa-shield-halved"></i>
                    </div>
                    <h1 className="admin-unauthorized-title">Área Restringida</h1>
                    <h2 className="admin-unauthorized-subtitle">Acceso Exclusivo para Administradores</h2>
                    <p>
                        Para acceder a los paneles de gestión de catálogo y administración de pedidos, 
                        es necesario contar con permisos de administrador en <strong>M&L E-commerce</strong>.
                    </p>

                    <div className="admin-unauthorized-actions">
                        <Link to="/log-in" className="admin-btn-primary" style={{ justifyContent: 'center' }}>
                            <i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesión como Administrador
                        </Link>
                        
                        <button 
                            type="button" 
                            onClick={simulateAdminLogin} 
                            className="admin-btn-secondary"
                            style={{ justifyContent: 'center' }}
                            title="Activa el rol de administrador en la sesión actual para pruebas"
                        >
                            <i className="fa-solid fa-key"></i> Simular Sesión de Administrador
                        </button>

                        <Link to="/" className="admin-btn-outline" style={{ justifyContent: 'center', marginTop: '4px' }}>
                            <i className="fa-solid fa-house"></i> Volver a la Tienda
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return children;
}

export default AdminRoute;
