import React, { useState } from 'react'
import { API_URL } from '../../config'

function usePatchProducts() {
 const [error, setError ] = useState(null)

 const patchProduct = async (formData, productId) => {
    setError(null)
    try {
        const response = await fetch(`${API_URL}products/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            throw new Error("Error al modificar el producto: " + response.status)
        }
        const data = await response.json()
        return true
    } catch (error) {
        console.error(error)
        setError(error)
        return false
    }
 }

 return { patchProduct, error }
}

export default usePatchProducts