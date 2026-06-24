import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './menu.css'

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
                    <NavLink aria-current="page" to="/">
                        Quienes Somos
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/contact" >
                        Contacto
                    </NavLink>
                </li>
                <li><NavLink to="/">Registrarse</NavLink></li>
                <li><NavLink to="/">Iniciar Sesión</NavLink></li>
                <li><NavLink to="/cart" style={{ fontWeight: 'bold', color: '#f8ffa8' }}>Carrito ({getCartCount()}) 🛒</NavLink></li>
            </ul>
        </nav>
    );
}
export default Menu
