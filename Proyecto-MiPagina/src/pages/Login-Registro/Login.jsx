import React, { useState } from 'react';
import useLoginUser from '../../hooks/user/useLoginUser';
import appleImg from '../../assets/Login-Registro/apple.png';
import googleImg from '../../assets/Login-Registro/logogoogle.png';

function Login() {
    const { loginUser } = useLoginUser(); 

    const [form, setForm] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
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
        
        const success = await loginUser(form);
        
        if (success) {
            window.alert("¡Inicio de sesión correcto! ¡Bienvenido! ✨");
            setForm({
                name: "",
                lastname: "",
                email: "",
                password: "",
            });
        }
    };

    return (
        <main>
            <h2>Iniciar Sesión</h2>
            
            <div className="contenedor-login">
                <div className="formulario">
                    <form onSubmit={handleFormSubmit}>
                        
                        {/* Campo de Nombre */}
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

                        {/* Campo de Apellido */}
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

                        {/* Campo de Email */}
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

                        {/* Campo de Contraseña */}
                        <div className="input-group">
                            <label>Contraseña:</label>
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

                        <button type="submit" className="btn-signup">Iniciar Sesión</button>
                        
                    
                        <div className="social-contenedor">
                            <button type="button" className="social-btn">
                                <img src={googleImg} alt="Logo Google" /> Google
                            </button>
                            <button type="button" className="social-btn">
                                <img src={appleImg} alt="Logo Apple" /> Apple
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="image-section"></div>
            </div>
        </main>
    );
}

export default Login;