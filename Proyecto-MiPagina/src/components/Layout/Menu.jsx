import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import AdminDropdown from '../../pages/Admin/AdminPanel'
import "../../Css/Elementos/Menu.css"

const Menu = () => {
    const { getCartCount } = useCart();
    return (
        <nav className="menu">

            <ul>
                <li>
                    <NavLink aria-current="page" to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/products/category/1">
                        Perfumes
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/products/category/2">
                        Accesorios
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/products/category/3">
                        Velas
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/products/category/4">
                        Cuidados Diarios
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/quienessomos">
                        Quienes Somos
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/contact" >
                        Contacto
                    </NavLink>
                </li>
                <li>
                    <AdminDropdown />
                </li>

                <li><NavLink to="/">Registrarse</NavLink></li>
                <li><NavLink to="/">Iniciar Sesión</NavLink></li>
                <li><NavLink to="/cart" >Carrito ({getCartCount()}) 🛒</NavLink></li>
            </ul>
        </nav>
    );
}
export default Menu
