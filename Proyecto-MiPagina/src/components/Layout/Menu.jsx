import  { useState } from 'react'
import {NavLink} from 'react-router-dom'
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
                    <NavLink aria-current="page" to="/">
                    Perfumes
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/">
                        Accesorios
                    </NavLink>
                </li>
                <li>
                  <NavLink aria-current="page" to="/">
                    Velas
                  </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/">
                        Cuidados Diarios
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/">
                        Quienes Somos
                    </NavLink>
                </li>
                <li>
                    <NavLink aria-current="page" to="/" >
                        Contacto
                    </NavLink>
                </li>
                <li><a href="html/login-registro/registrarse.html">Registrarse</a></li>
                <li><a href="html/login-registro/iniciarsesion.html">Iniciar Sesión</a></li>
            </ul>
        </nav>
    );
}

export default Menu
