import { useState } from "react";
import { API_URL } from "../../config";

import React from 'react'

function useDeleteProducts() {
const[error, setError]= useState(null)
const deleteProducts = async(productId) =>
{
    setError(null)
    try {
        const response = await fetch(`${API_URL}products/${productId}`,{
            method: "DELETE",
            headers:{
                "Content-type": "Application/json"
            }
        })
        if(!response.ok)
        {
            throw new Error(`Http error, status: ${response.status}`)
        }
    } catch (error) {
        console.log(error)
        setError(error)
    }
}
return{error,deleteProducts}

}

export default useDeleteProducts