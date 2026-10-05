import { useState } from "react"
import { API_URL } from "../../config"

function useLoginUser() {
    const [error, setError] = useState(null)

    const loginUser = async (emailOrForm, password) => {
        setError(null)
        
        let email = emailOrForm;
        let pass = password;
        
        if (typeof emailOrForm === 'object' && emailOrForm !== null) {
            email = emailOrForm.email;
            pass = emailOrForm.password;
        }

        try {
           // Cambiamos /user a /users para consultar el array principal
           const response = await fetch(`${API_URL}/user`);
            if(!response.ok){
                throw new Error(`Error al leer usuarios, ${response.status}`)
            }
            const users = await response.json()

            // Verificamos coincidencia de email y password
            const userFound = users.find((user) => user.email === email && user.password === pass)
            
            if(!userFound){
                setError("Credenciales incorrectas")
                return null
            }

            const { password: _, ...userSinPassword } = userFound

            return userSinPassword

        } catch (error) {
            console.error("Error al loggear usuario", error)
            setError(error)
            return null
        }
    }
    return { error, loginUser }
}
console.log(API_URL)
export default useLoginUser