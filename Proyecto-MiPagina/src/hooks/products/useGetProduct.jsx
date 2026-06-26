import { useEffect, useState } from "react"
import { API_URL } from "../../config.js"

function useGetProducts() {
    //estos datos van en estados porque se deben mostrar, tomar decisiones a partir de ellos
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    // url va a ser la direccion de la API
    
    const getProducts = async (url) => {
        try {
            setLoading(true)
            setError(null)
            //para limpiar
           const response = await fetch(url)

           if(!response.ok){
            throw new Error("Error al traer los registros de productos", response.status) //te hace saber cual fue el error que te llego
           }

           // Convertimos la respuesta de la api en un obj de js manejable si no hubo error
           const data = await response.json()

           //guardamos la data de la respuesta del array
           setProducts(data)

        } catch (error) {
            //console.error(error)
            setError(error)
            setProducts([])
        } finally {
            setLoading(false)
        }
        //si salio bien o mal, deja de cargar
    }
//en el caso de los get hacemos la ejecucuion dentro del hook
//constantemente ejecuto el hook y hago llamadas a la api cuando necesito
    useEffect(() => {
        getProducts(`${API_URL}products`)
    }, [])
//como retorno pasamos la info que queremos exteriorizar. Estados
    return {products, error, loading, getProducts}
}

export default useGetProducts