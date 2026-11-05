import { useState } from "react"
import { ROUTES } from "../../config" 
import { api } from "../../utils/api"
import { leerSesion } from "../../utils/adapters"

function useLoginUser() {
    const [error, setError] = useState(null)

    const loginUser = async (email, password) => {
        setError(null)

        try {
            const data = await api("POST", ROUTES.login, {
                body: { email, password },
                porDefecto: "Invalid email or password"
            })

           
            const token = data.token || data.accessToken || data.jwt || data.data?.token;

           
            if (token) {
                localStorage.setItem("token", token);
            } else {
                console.warn("⚠️ No hay token reconocible:", data);
            }

            return { user: leerSesion(data), token }
        } catch (err) {
            setError(err)
            return { message: err.message }
        }
    }

    return { error, loginUser }
}

export default useLoginUser