import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import AdminDropdown from '../../pages/Admin/AdminPanel'
import "../../Css/Elementos/Menu.css"

const Menu = () => {
    const { getCartCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
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
                {isAuthenticated && user?.email === "mora@mora.com" && (
                    <li>
                        <AdminDropdown />
                    </li>
                )}

                {!isAuthenticated ? (
                    <>
                        <li><NavLink to="/register" onClick={closeMenu}>Registrarse</NavLink></li>
                        <li><NavLink to="/log-in" onClick={closeMenu}>Iniciar Sesión</NavLink></li>
                    </>
                ) : (
                    <>
                        <li><span className="menu-user-greeting">Hola, {user.name} 👋</span></li>
                        <li><button onClick={() => { logout(); closeMenu(); }} className="menu-btn-logout">Cerrar Sesión</button></li>
                    </>
                )}
                <li><NavLink to="/cart" onClick={closeMenu}>Carrito ({getCartCount()}) 🛒</NavLink></li>
            </ul>
        </nav>
    );
}
export default Menu
