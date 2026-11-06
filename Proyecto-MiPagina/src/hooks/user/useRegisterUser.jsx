import { useState } from "react"
import { ROUTES } from "../../config"
import { api } from "../../utils/api"
import { leerSesion } from "../../utils/adapters"

function useRegisterUser() {
    const [error, setError] = useState(null)

    const registerUser = async (formData) => {
        setError(null)

        try {
            const data = await api("POST", ROUTES.registro, {
                body: {
                    name: formData.name,
                    lastname: formData.lastname, 
                    date: formData.date,     
                    email: formData.email,
                    password: formData.password
                },
                porDefecto: "Error creating user account"
            })

            return { user: leerSesion(data) }
        } catch (err) {
            console.error("Error registering user:", err)
            setError(err)
            return { message: err.message }
        }
    }

    return { error, registerUser }
}
export default useRegisterUser