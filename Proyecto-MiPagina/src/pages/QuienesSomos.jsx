import React from "react";
import grid1 from "../assets/QuienesSomos/imagengrid1.jpg"
import grid2 from "../assets/QuienesSomos/imagengrid2.jpg"
import grid3 from "../assets/QuienesSomos/imagengrid3.jpg"
import grid4 from "../assets/QuienesSomos/imagengrid4.jpg"
import grid5 from "../assets/QuienesSomos/imagengrid5.jpg"
import grid6 from "../assets/QuienesSomos/imagengrid6.jpg"
import grid7 from "../assets/QuienesSomos/imagengrid7.jpg"
import grid8 from "../assets/QuienesSomos/imagengrid8.jpg"
import grid9 from "../assets/QuienesSomos/imagengrid9.jpg"
import grid10 from "../assets/QuienesSomos/imagengrid10.jpg"
import grid11 from "../assets/QuienesSomos/imagengrid11.jpg"
import grid12 from "../assets/QuienesSomos/imagengrid12.jpg"
import logoimg from "../assets/QuienesSomos/imagen1.jpeg"
import "../Css/QuienesSomos.css"
function QuienesSomos() {
    return (

        <main>
            <section className="presentacion">
                <h2>Quienes Somos</h2>
                <h3>Conoce la historia detrás de M&L y nuestra pasión por la belleza y el bienestar.</h3>
                <img src={logoimg} className="logo-central" alt="Logo Central M&L" />
            </section>

            <section className="nuestra-historia">
                <h3>¿Como surge M&L?</h3>
                <p className="ppresentacion">
                    M&L nació de un sueño: crear un espacio donde cada persona pueda encontrar
                    productos que no solo embellezcan, sino que también inspiren confianza y bienestar.
                </p>
                <p className="ppresentacion">
                    Somos un emprendimiento familiar dedicado a seleccionar cuidadosamente cada
                    artículo que ofrecemos. Desde perfumes exclusivos hasta bijouterie elegante, velas aromáticas y
                    productos de cuidado diario, cada elemento ha sido elegido pensando en ti.
                </p>
                <p className="ppresentacion">
                    Creemos que la belleza verdadera viene de sentirse bien consigo mismo, y nuestros
                    productos están diseñados para acompañarte en ese camino hacia tu mejor versión, todos los días.
                </p>
            </section>

            <section className="section-valores">
                <h2> Nuestros Valores</h2>
                <div className="contenedor-valores">
                    <div className="tarjeta-valores">
                        <i className="fa-solid fa-heart fa-2xl" style={{ color: 'white' }}></i>
                        <h3> Pasión </h3>
                        <p>Amamos lo que hacemos y eso se refleja en cada producto que ofrecemos y las ganas de seguir progresando.</p>
                    </div>

                    <div className="tarjeta-valores">
                        <i className="fa-solid fa-person-half-dress fa-2xl" style={{ color: 'white' }}></i>
                        <h3> Calidad </h3>
                        <p>Nos aseguramos de traer productos de buena calidad para que nuestros clientes queden conformes con nuestro servicio.</p>
                    </div>

                    <div className="tarjeta-valores">
                        <i className="fa-solid fa-wand-magic-sparkles fa-2xl" style={{ color: 'white' }}></i>
                        <h3>Comunidad</h3>
                        <p>Construimos relaciones duraderas con nuestros clientes. ¡La familia M&L crece cada vez mas!</p>
                    </div>

                    <div className="tarjeta-valores">
                        <i className="fa-solid fa-star fa-2xl" style={{ color: 'white' }}></i>
                        <h3>Exclusividad</h3>
                        <p>Buscamos productos innovadores y exclusivos que te hacen sentir especial.</p>
                    </div>
                </div>
            </section>

            <section className="grid-section">
                <div className="container">
                    <h1>Welcome, this is</h1>
                    <h1>M&L Beauty.</h1>
                </div>
                <div className="parent">
                    <div className="div1"><img src={grid1} alt="imagen playa" /></div>
                    <div className="div2"><img src={grid2} alt="imagen playa" /></div>
                    <div className="div3"><img src={grid3} alt="imagen flores" /></div>
                    <div className="div4"><img src={grid4} alt="velas" /></div>
                    <div className="div5"><img src={grid5} alt="amazonas" /></div>
                    <div className="div6"><img src={grid6} alt="tablas" /></div>
                    <div className="div7"><img src={grid7} alt="imagen" /></div>
                    <div className="div8"><img src={grid8} alt="imagen" /></div>
                    <div className="div9"><img src={grid9} alt="imagen" /></div>
                    <div className="div10"><img src={grid10} alt="imagen" /></div>
                    <div className="div11"><img src={grid11} alt="imagen" /></div>
                    <div className="div11"><img src={grid12} alt="imagen" /></div>
                </div>
            </section>
        </main>
    )
}
export default QuienesSomos;