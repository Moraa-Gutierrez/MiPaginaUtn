import React, { useState } from 'react'
import { API_URL } from '../config'

function usePatchProducts() {
 const [error, setError ] = useState(null)

 const patchProduct = async = (formData,productId) => {

    setError(null)
    try {
        const response = await fetch (`${API_URL}products/${productId}`,{
            method: "PATCH",
            headers: {
                "Content-type": "Application/json"
            },
            // Necesariamente se tiene que convertir formData en JSON
            body: JSON.stringify(formData)
        })
        if(!response.ok)
        {
            throw new Error(
                "Error al traer el producto",response.status
            )
        }
        const data = await response.json()
    } catch (error) {
        console.log(error)
        setError(error)
        return null
    }
 }
}

export default usePatchProducts