import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../../hooks/user/useLoginUser";
import useAuth from "../../context/AuthContext";
import googleImg from "../../assets/Login-Registro/logogoogle.png";
import appleImg from "../../assets/Login-Registro/apple.png";
import { Link } from "react-router-dom";
import { notifyToast, notifyError } from "../../utils/notify";
function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { login } = useAuth();
    const navigate = useNavigate();
    const { error: loginError, loginUser } = useLoginUser();
    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();


        const result = await loginUser(form.email, form.password);

        console.log("Resultado del login:", result);
        if (result?.user) {


            if (result.token) {
                localStorage.setItem('token', result.token);
            }


            login(result.user);

            setForm({ email: "", password: "" });

            const nombreMostrar = result.user.name || result.user.nombre || "Usuario";
            notifyToast(`¡Hola ${nombreMostrar}!`);

            navigate("/");
        } else {
            notifyError("No se pudo iniciar sesión", result?.message || "Credenciales incorrectas");
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