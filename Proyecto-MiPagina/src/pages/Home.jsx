import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import CarouselFadeExample from '../components/Carrousel';
import '../../src/index.css'
function Home() {
  // Función para manejar la música en React
  const toggleMusic = () => {
    const player = document.getElementById('music-player');
    if (player) {
      player.classList.toggle('music-hidden');
    }
  };

  return (
    <>
      <header>
            <h1>M&L</h1>
        <p className="subtitulo">Tu mejor version, todos los dias</p> 
   
        <hr />
      </header>

      <main>
        <section>
          <section className="hero">
            <div className="hero-container">
              <div className="hero-content">
                <h1 className="h1hero">Se tu mejor version cada dia</h1>
                <p>
                  Descubre nuestra exclusiva colección de perfumes, bijouterie, velas aromáticas y productos de
                  cuidado personal que realzarán tu belleza natural.
                </p>
                <div className="hero-cta">
                  <Link to="/registrarse" className="boton boton-1">Comenzar ahora</Link>
                  <a href="#" className="boton boton-2">Saber más</a>
                  <button className="btn-music" onClick={toggleMusic}>🎧</button>

                  <div id="music-player" className="music-hidden">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: '12px' }}
                      src="https://open.spotify.com/embed/playlist/7ctZtN5IsXZmw7sl6ggmie?utm_source=generator"
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allowFullScreen=""
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className="presentacion">
          <h3>Bienvenidos a M&L</h3>
          <p className="subtitulo">Explora todas nuestras categorías</p>
          <p>
            Descubre nuestra exclusiva colección de perfumes, bijouterie, velas aromáticas y productos de cuidado
            personal que realzarán tu belleza natural.
          </p>
          <div className="contenedor-botones">
            <a href="#" className="boton boton-1">Ver Productos</a>
            <a href="#catalogo" className="boton boton-2">Conoce Más</a>
          </div>
        </section>

        <section className="virtudes">
          <div className="texto-virtud">
            <h3>Descubre tu Esencia</h3>
            <p className="pvirtud">
              En M&L creemos que cada persona es única y merece productos que reflejen su
              personalidad. Nuestra cuidadosa selección combina elegancia, calidad y exclusividad.
            </p>
            <p className="pvirtud">
              Desde perfumes cautivadores hasta bijouterie sofisticada, velas aromáticas y productos
              de cuidado personal premium, cada artículo ha sido elegido pensando en ti.
            </p>
            <Link className="boton boton-3" to="/quienessomos">Conoce nuestra historia</Link>
          </div>
          <div className="tarjeta-virtud">
            <h3>¿Por Que elegirnos?</h3>
            <ul>
              <li>Productos de alta calidad seleccionados cuidadosamente</li>
              <li>Atención personalizada y asesoramiento experto</li>
              <li>Envíos rápidos y seguros a todo el país</li>
              <li>Garantía de satisfacción en todos nuestros productos</li>
            </ul>
          </div>
        </section>

        <div className="mapa-contenedor">
          <h2>📍 Dónde encontrarnos</h2>
          <p>Estamos en Necochea. Podés acercarte o coordinar tu pedido con nosotras 💜</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49917.41647623474!2d-58.79756154264208!3d-38.56053389988257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x958fbd434330e9e9%3A0x7f7c099276fb322!2sNecochea%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1774559379731!5m2!1ses!2sar"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <h3>Nacimos aca, con las playas mas lindas y paisajes soñados</h3>
        <div className='carrusel'>
          <CarouselFadeExample />
        </div>

        <section id="catalogo">
          <h3>¿Que ofrecemos?</h3>
          <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Ver más</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>🌸 Perfumes</td>
                <td>Fragancias únicas para cada ocasión.</td>
                <td><Link to="/products/category/perfumes">Explorar</Link></td>
              </tr>
              <tr>
                <td>🕯️ Velas</td>
                <td>Aromas que crean ambientes cálidos.</td>
                <td><Link to="/products/category/velas">Explorar</Link></td>
              </tr>
              <tr>
                <td>💎 Bijouterie</td>
                <td>Accesorios delicados y modernos.</td>
                <td><Link to="/products/category/accesorios">Explorar</Link></td>
              </tr>
              <tr>
                <td>🧴 Cuidado personal</td>
                <td>Productos pensados para tu bienestar.</td>
                <td><Link to="/products/category/cuidadosdiarios">Explorar</Link></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default Home;