import React from "react";

function QuienesSomos() {
    return (
        <main>
            <section className="presentacion">
                <h2>Quienes Somos</h2>
                <h3>Conoce la historia detrás de M&L y nuestra pasión por la belleza y el bienestar.</h3>
                <img src="/img/imagen1.jpeg" className="logo-central" alt="Logo Central M&L" />
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
                    <div className="div1"><img src="/img/imagengrid2.jpg" alt="imagen playa" /></div>
                    <div className="div2"><img src="/img/imagengrid1.jpg" alt="imagen playa" /></div>
                    <div className="div3"><img src="/img/imagengrid3.jpg" alt="imagen flores" /></div>
                    <div className="div4"><img src="/img/imagengrid4.jpg" alt="velas" /></div>
                    <div className="div5"><img src="/img/imagengrid5.jpg" alt="amazonas" /></div>
                    <div className="div6"><img src="/img/imagengrid6.jpg" alt="tablas" /></div>
                    <div className="div7"><img src="/img/imagengrid7.jpg" alt="imagen" /></div>
                    <div className="div8"><img src="/img/imagengrid8.jpg" alt="imagen" /></div>
                    <div className="div9"><img src="/img/imagengrid9.jpg" alt="imagen" /></div>
                    <div className="div10"><img src="/img/imagengrid10.jpg" alt="imagen" /></div>
                    <div className="div11"><img src="/img/imagengrid11.jpg" alt="imagen" /></div>
                </div>
            </section>
        </main>
    )
}
export default QuienesSomos