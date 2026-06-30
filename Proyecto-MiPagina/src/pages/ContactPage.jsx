import React, { useState } from "react";
import "../Css/Contacto.css"
function ContactPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        email: "",
        message: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();

        console.log("Formulario de contacto enviado con éxito:", form);
        window.alert(`Gracias por tu mensaje 💌, ${form.name} a la brevedad nos comunicaremos con usted🤗`)

        setForm({
            name: "",
            lastname: "",
            email: "",
            message: "",
        });
        setIsModalOpen(false);
    }

    return (

        <main>
            <div className="contacto">
                <div className="contacto-content">
                    <h2>Contacto</h2>
                    <h3>Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros.</h3>
                    <p>Llena el siguiente formulario</p>
                    <button
                        type="button"
                        id="contact-button"
                        className="btn btn-formulario"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Formulario</button>
                </div>
            </div>
            {isModalOpen && (
                <div className="contenedor-modal">
                    <div className="modal">
                        <span
                            className="cerrar-modal"
                            id="cerrarmodal"
                            onClick={() => setIsModalOpen(false)}
                        >
                            &times;
                        </span>
                        <p className="contenedorp">Completa el formulario para contactarnos:</p>


                        <form onSubmit={handleFormSubmit}>
                            <label htmlFor="name-input">Nombre:</label>
                            <input
                                type="text"
                                name="name"
                                id="name-input"
                                value={form.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Ingrese su nombre"
                            />

                            <label htmlFor="lastname-input">Apellido:</label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname-input"
                                value={form.lastname}
                                onChange={handleInputChange}
                                required
                                placeholder="Ingrese su apellido"
                            />

                            <label htmlFor="email-input">Correo Electrónico:</label>
                            <input
                                type="email"
                                name="email"
                                id="email-input"
                                value={form.email}
                                onChange={handleInputChange}
                                required
                                placeholder="Ingrese su correo electrónico"
                            />

                            <label htmlFor="message-input">Mensaje:</label>
                            <textarea
                                name="message"
                                id="message-input"
                                rows="4"
                                value={form.message}
                                onChange={handleInputChange}
                                required
                                placeholder="Ingrese su mensaje"
                            ></textarea>

                            <br />
                            <input
                                type="submit"
                                value="Enviar"
                                id="submit-button"
                            />
                        </form>
                    </div>
                </div>

            )
            }
        </main >
    );
}
export default ContactPage