import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../Css/Admin/AdminShared.css';


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

            <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                    isActive ? "admin-nav-tab active" : "admin-nav-tab"
                }
            >
                <i className="fa-solid fa-users"></i>
                Gestión de Usuarios
            </NavLink>
        </div>
    );
}

export default AdminNavTabs;
