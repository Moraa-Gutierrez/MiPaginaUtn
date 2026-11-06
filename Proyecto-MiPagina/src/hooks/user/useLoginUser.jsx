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
                porDefecto: "Credenciales incorrectas"
            })
            // user = { id, name, lastName, email, role, token }
            return { user: leerSesion(data) }
        } catch (error) {
            console.error("Error al loggear usuario", error)
            setError(error)
            return { message: error.message }
        }
    }
    return { error, loginUser }
}

export default useLoginUser

