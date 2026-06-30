import React, { useState } from 'react';
import useRegisterUser from '../../hooks/user/useRegisterUser'; // <-- Usamos tu hook de usuario
import appleImg from '../../assets/Login-Registro/apple.png';
import googleImg from '../../assets/Login-Registro/logogoogle.png';
import "../../Css/Login/Registrarse.css"

function Registro() {

    const { registerUser } = useRegisterUser(); 

   
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        date: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            window.alert("❌ Las contraseñas no coinciden.");
            return;
        }

      
        const success = await registerUser(form);
        
        if (success) {
            window.alert("¡Registro completado! ✨");

            setForm({
                name: "",
                lastname: "",
                date: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        }
    };

    return (
        
        <div className="contenedor-login">
            <div className="formulario">
     
                <form onSubmit={handleFormSubmit}>
                    
                    <div className="input-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            id="name-input"
                            value={form.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Ingrese su nombre"
                        />
                    </div>

                    <div className="input-group">
                        <label>Apellido:</label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname-input"
                            value={form.lastname}
                            onChange={handleInputChange}
                            required
                            placeholder="Ingrese su apellido"
                        />
                    </div>

                    <div className="input-group">
                        <label>Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            name="date"
                            id="date-input"
                            value={form.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email-input"
                            value={form.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Ingrese su correo electrónico"
                        />
                    </div>

                    <div className="input-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password-input"
                            value={form.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>

                    <div className="input-group">
                        <label>Confirma tu contraseña</label>
                        <input
                            type="password"
                            name="confirmPassword" 
                            id="confirmPassword-input"
                            value={form.confirmPassword} 
                            onChange={handleInputChange}
                            required
                            placeholder="Confirma tu contraseña"
                        />
                    </div>

                    <button type="submit" className="btn-signup">Registrarse</button>
                    
                    <div className="social-contenedor">
                        <button type="button" className="social-btn">
                            <img src={googleImg} alt="Logo Google" /> Google
                        </button>
                        <button type="button" className="social-btn">
                            <img src={appleImg} alt="Logo Apple" /> Apple
                        </button>
                    </div>
                </form>

                <p className="footer-form">
                    ¿Ya estás registrado? <a className="afooter" href="/log-in">Inicia Sesión</a>
                </p>
            </div>
            
            <div className="image-section"></div>
        </div>
    );
}

export default Registro;