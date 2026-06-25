import { Carousel } from 'react-bootstrap';
import img1 from "../../src/assets/Home/neco1.jpg"
import img2 from "../../src/assets/Home/neco2.jpg"
import img3 from "../../src/assets/Home/neco3.jpg"
import img4 from "../../src/assets/Home/neco4.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
function CarouselFadeExample() {
    return (
        <Carousel fade>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img1}
                    alt="Primera imagen de Necochea" />
                <Carousel.Caption>
                    <h3>Primera diapositiva</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img2}
                    alt="Segunda imagen de Necochea"
                />
                <Carousel.Caption>
                    <h3>Segunda diapositiva</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img3}
                    alt="Tercera imagen de Necochea" />
                <Carousel.Caption>
                    <h3>Tercera diapositiva</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img4}
                    alt="Cuarta imagen de Necochea" />
                <Carousel.Caption>
                    <h3>Cuarta diapositiva</h3>
                    <p>Descripción adicional para la cuarta imagen.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselFadeExample;