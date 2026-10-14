import { useState } from "react";
import { API_URL } from "../../config";

function useDeleteProducts() {
  const [error, setError] = useState(null);

  const deleteProducts = async (productId) => {
    setError(null);
    try {
      // Agregamos la "/" antes de products
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Http error, status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error(error);
      setError(error);
      return false;
    }
  };

  return { error, deleteProducts };
}

export default useDeleteProducts;