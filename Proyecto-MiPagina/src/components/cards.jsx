import { useState } from 'react'
import './cards.css'
const Cards = () => {
    return (
         <section className="cards">
                <article className="tarjeta">
                    <div className="tarjeta-imagen">
                 <img src="../img/cadena canasta cielo2.jpg" alt="Producto 1"></img>
                    </div>
                    <div className="tarjeta-cuerpo">
                        <h3 className="titulo">Producto Uno</h3>
                        <p className="descripcion">Breve descripción del producto que explica sus beneficios.</p>
                        <p className="precio">$2.500</p>
                        <div className="botones">
                            <a href="#" className="btn btn-secundario">Detalle</a>
                            <button className="btn btn-primario">Añadir al Carrito</button>
                        </div>
                    </div>
                </article>
                </section>
    );
}
export default Cards

