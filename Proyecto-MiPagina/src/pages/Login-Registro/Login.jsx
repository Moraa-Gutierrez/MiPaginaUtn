import React, { useState } from 'react';
import useLoginUser from '../../hooks/user/useLoginUser';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import appleImg from '../../assets/Login-Registro/apple.png';
import googleImg from '../../assets/Login-Registro/logogoogle.png';

function Login() {
    const { loginUser, error: loginError } = useLoginUser(); 
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
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
        
        const userData = await loginUser(form.email, form.password);
        
        if (userData) {
            login(userData);
            window.alert(`¡Inicio de sesión correcto! ¡Bienvenido, ${userData.name}! ✨`);
            setForm({
                email: "",
                password: "",
            });
            navigate("/");
        }
    };

    return (
        <main>
            <h2>Iniciar Sesión</h2>
            
            <div className="contenedor-login">
                <div className="formulario">
                    <form onSubmit={handleFormSubmit}>
                        
                        {/* Campo de Email */}
                        <div className="input-group">
                            <label htmlFor="email-input">Email:</label>
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
                            <label htmlFor="password-input">Contraseña:</label>
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

                        {loginError && (
                            <p style={{ color: 'red', margin: '10px 0', fontSize: '14px', textAlign: 'center' }}>
                                {typeof loginError === 'string' ? loginError : 'Credenciales incorrectas'}
                            </p>
                        )}

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

                    <p className="footer-form" style={{ marginTop: '15px', textAlign: 'center', fontFamily: 'Arimo, sans-serif' }}>
                        ¿No tienes una cuenta? <Link className="afooter" to="/register">Regístrate aquí</Link>
                    </p>
                </div>
                
                <div className="image-section"></div>
            </div>
        </main>
    );
}

export default Login;