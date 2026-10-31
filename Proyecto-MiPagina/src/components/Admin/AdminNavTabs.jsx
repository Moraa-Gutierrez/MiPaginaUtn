import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../Css/Admin/AdminShared.css';

/**
 * Barra de Pestañas de Navegación entre los dos Paneles de Administración
 */
function AdminNavTabs() {
    return (
        <div className="admin-nav-tabs">
            <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                    isActive ? "admin-nav-tab active" : "admin-nav-tab"
                }
            >
                <i className="fa-solid fa-boxes-stacked"></i>
                Gestión de Productos
            </NavLink>

            <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                    isActive ? "admin-nav-tab active" : "admin-nav-tab"
                }
            >
                <i className="fa-solid fa-receipt"></i>
                Gestión de Órdenes y Pedidos
            </NavLink>
        </div>
    );
}

export default AdminNavTabs;
