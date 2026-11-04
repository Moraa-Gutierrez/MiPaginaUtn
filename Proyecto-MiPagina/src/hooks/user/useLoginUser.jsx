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

            return { user: leerSesion(data) }
        } catch (err) {
            console.error("Error logging in:", err)
            setError(err)
            return { message: err.message }
        }
    }

    return { error, loginUser }
}

export default useLoginUser