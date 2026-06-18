import { useEffect, useState } from "react";
import { API_URL } from "../../config.js";

function useGetProductsByCategory(categoriaId) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const getProductsByCategory = async (id) => {
        // Si no nos pasan un ID válido, no hacemos la petición
        if (!id) return;

        try {
            setLoading(true);
            setError(null);

            // JSON Server filtra automáticamente usando ?categoria_id=EL_ID
            const response = await fetch(`${API_URL}products?category_id=${id}`);

            if (!response.ok) {
                throw new Error("Error al traer los productos de esta categoría");
            }

            const data = await response.json();
            setProducts(data);

        } catch (error) {
            console.error(error);
            setError(error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Cada vez que el categoriaId cambie, volvemos a pedir los productos
    useEffect(() => {
        getProductsByCategory(categoriaId);
    }, [categoriaId]);

    return { products, error, loading };
}

export default useGetProductsByCategory;