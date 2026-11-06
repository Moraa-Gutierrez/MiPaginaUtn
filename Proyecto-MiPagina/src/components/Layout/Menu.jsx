import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import useAuth from '../../hooks/user/useAuth' // Asegurate de que esta ruta sea la correcta hacia tu hook de auth
import "../../Css/Elementos/Menu.css"

const Menu = () => {
   
    const { unidades } = useCart();
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="menu">
            <div className="menu-mobile-header">
                <NavLink to="/" className="menu-brand" onClick={closeMenu}>
                    M&L
                </NavLink>
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú">
                    <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
                </button>
            </div>

            <ul className={isOpen ? "menu-links open" : "menu-links"}>
                <li>
                    <NavLink aria-current="page" to="/" onClick={closeMenu}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/products/category/1" onClick={closeMenu}>
                        Perfumes
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/products/category/2" onClick={closeMenu}>
                        Accesorios
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/products/category/3" onClick={closeMenu}>
                        Velas
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/products/category/5" onClick={closeMenu}>
                        Figuras de Yeso y Cemento
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/products/category/4" onClick={closeMenu}>
                        Cuidados Diarios
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/quienessomos" onClick={closeMenu}>
                        Quienes Somos
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/contact" onClick={closeMenu}>
                        Contacto
                    </NavLink>
                </li>
                
                {/* Panel Admin: visible solo para administradores */}
                {isAdmin && (
                    <li>
                        <NavLink to="/admin/users" onClick={closeMenu}>
                            Panel Admin
                        </NavLink>
                    </li>
                )}

                {!isAuthenticated ? (
                    <>
                        <li><NavLink to="/register" onClick={closeMenu}>Registrarse</NavLink></li>
                        <li><NavLink to="/log-in" onClick={closeMenu}>Iniciar Sesión</NavLink></li>
                    </>
                ) : (
                    <>
                        <li><span className="menu-user-greeting">Hola, {user?.name || user?.nombre || user?.lastname} 👋</span></li>
                        <li><button onClick={() => { logout(); closeMenu(); }} className="menu-btn-logout">Cerrar Sesión</button></li>
                    </>
                )}
                
                {/* 🛒 Acá usamos 'unidades' directamente del contexto del profesor */}
                <li><NavLink to="/cart" onClick={closeMenu}>Carrito ({unidades || 0}) 🛒</NavLink></li>
            </ul>
        </nav>
    );
}

export default Menu;