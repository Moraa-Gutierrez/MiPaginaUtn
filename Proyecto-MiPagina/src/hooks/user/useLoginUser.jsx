import { useState } from "react"
import { API_URL } from "../../config"

function useLoginUser() {
    const [error, setError] = useState(null)

    const loginUser = async (email, password) => {
        setError(null)
        
        try {
           // Apuntamos a tu ruta de login en el backend (ej: /api/auth/login o /api/users/login)
           const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if(!response.ok){
                const errData = await response.json();
                throw new Error(errData.error || "Credenciales incorrectas");
            }

            const data = await response.json(); // Retorna { usuario, token } del loginService

            // Opcional: si guardas el token en sessionStorage para futuras peticiones protegidas
            if (data.token) {
                sessionStorage.setItem("token", data.token);
            }

            // Retornamos el objeto usuario (que ya incluye .name para el Login.jsx)
            return data.usuario;

        } catch (error) {
            console.error("Error al loggear usuario", error);
            setError(error.message || "Credenciales incorrectas");
            return null;
        }
    }
    return { error, loginUser }
}

export default useLoginUser;