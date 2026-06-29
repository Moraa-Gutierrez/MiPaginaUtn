import '../../Css/Elementos/Footer.css'
const Footer = () => {
    return (
        <footer className="footer-nav">
            <ul className="footer-items">
                <li>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                       <i className="fa-brands fa-facebook fa-beat fa-xl" style={{ color: 'white' }}></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                       <i className="fa-brands fa-instagram fa-beat fa-xl" style={{ color: 'white' }}></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
                       <i className="fa-brands fa-tiktok fa-beat fa-xl" style={{ color: 'white' }}></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.gmail.com/" target="_blank" rel="noopener noreferrer">
                      <i className="fa-solid fa-envelope fa-beat fa-xl" style={{ color: 'white' }}></i>
                    </a>
                </li>
            </ul>

            <p className="footer-section-title">📱 WhatsApp</p>
            
            <ul className="footer-items">
                <li>
                    <p>Mora</p>
                    <a href="https://www.whatsapp.com/?lang=es" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-whatsapp fa-bounce fa-xl" style={{ color: 'white' }}></i>
                    </a>
                </li>
                <li> 
                   <p>Karina</p> 
                    <a href="https://www.whatsapp.com/?lang=es" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-whatsapp fa-bounce fa-xl" style={{ color: 'white' }}></i>
                    </a>
                </li>
            </ul>

            <blockquote>
                <p>"La mejor versión de ti todos los días"</p>
            </blockquote>
            
            <p>&copy; {new Date().getFullYear()}. Todos los derechos reservados.</p>
        </footer>
    );
}
export default Footer