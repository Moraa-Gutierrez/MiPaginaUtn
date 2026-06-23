import { useState } from "react"
import { API_URL } from "../../config.js"
//loading si hay muchos obj o peticiones grandes
function usePostProduct() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const postProduct = async (formData) => {
        setError(null)
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}products`, {
                // Define el metodo http
                method: "POST",
                // Define el tipo de informacion que viaja, en este caso es texto
                headers: {
                    "Content-type": "application/json"
                },
                // Body es donde viaja la informacion
                body: JSON.stringify(formData)
            })
              if(!response.ok){
                throw new Error(`Error al crear el producto, ${response.status}`)
            }

            const data = await response.json()
            console.log({data})
            // Data posee los datos de respuesta de la API
            return data
        } catch (error) {
            console.error("Error al crear un nuevo producto", error)
            setError(error)
            return null
        } finally{
            setLoading(false)
        }
    }
    return {error,loading,postProduct}
    //forma de react para exponer funcs. Puede usarse como callback,etc
}

export default usePostProduct


