import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './menu.css'

const Menu = () => {
    return (
        <nav className="menu">

            <ul>
                <li>
                    <NavLink aria-current="page" to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/Products/category/perfumes">
                        Perfumes
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/Products/category/Accesorios">
                        Accesorios
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/Products/category/Velas">
                        Velas
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/Products/category/CuidadosDiarios">
                        Cuidados Diarios
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/">
                        Quienes Somos
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/Contact" >
                        Contacto
                    </NavLink>
                </li>
                <li><NavLink to="/">Registrarse</NavLink></li>
                <li><NavLink to="/">Iniciar Sesión</NavLink></li>
            </ul>
        </nav>
    );
}
export default Menu
