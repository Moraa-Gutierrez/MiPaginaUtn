import { useState } from "react";
import { API_URL } from "../../config";

import React from 'react'

function useDiscontinueProduct() {
 const [error, setError] = useState(null)
 const [loading, setLoading] = useState(false)

 const discontinueProduct = async (productId)=> {
    setError(null);
    setLoading(true);
    try {
        const response = await fetch(`${API_URL}products/${productId}`, {
                method: "PATCH", // Modificación parcial
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    active: false // Apagamos el producto pero conservamos sus datos
                })
            });

            if (!response.ok) {
                throw new Error(`Error al descontinuar el producto. Status: ${response.status}`);
            }
            return true;
    } catch (error) {
        
    console.error(error);
            setError(error.message || error);
            return false;
        } finally {
            setLoading(false);
        }
    };
    return{error,loading,discontinueProduct};
}

export default useDiscontinueProduct;