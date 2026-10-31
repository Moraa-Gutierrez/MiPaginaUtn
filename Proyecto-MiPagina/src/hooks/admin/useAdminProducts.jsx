import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '../../config';

/**
 * Hook para la Administración de Productos (Catálogo)
 * Maneja peticiones a Node/Express con soporte para multipart/form-data (carga de imágenes),
 * cabeceras de autorización con JWT y estados de interfaz inmediatos.
 */
export function useAdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);

    const getAuthHeaders = () => {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const clearToast = () => {
        setToast(null);
    };

    // 1. Obtener listado de productos
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Intentar primero endpoint directo o con prefijo /api
            let response = await fetch(`${API_URL}/products`);
            if (!response.ok && response.status === 404) {
                response = await fetch(`${API_URL}/api/products`);
            }

            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo cargar el catálogo.`);
            }

            const data = await response.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error al obtener productos:", err);
            setError(err.message || "Error al conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // 2. Crear Producto (Soporta FormData multipart/form-data o JSON)
    const createProduct = async (formDataOrObject) => {
        setSubmitting(true);
        setError(null);
        try {
            const isFormData = formDataOrObject instanceof FormData;
            const headers = {
                ...getAuthHeaders(),
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
            };

            const body = isFormData ? formDataOrObject : JSON.stringify(formDataOrObject);

            let response = await fetch(`${API_URL}/products`, {
                method: "POST",
                headers,
                body,
            });

            if (!response.ok && response.status === 404) {
                response = await fetch(`${API_URL}/api/products`, {
                    method: "POST",
                    headers,
                    body,
                });
            }

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || errData.message || `Error al crear producto (${response.status})`);
            }

            const newProduct = await response.json();
            
            // Actualizar lista en memoria inmediatamente
            setProducts(prev => [newProduct, ...prev]);
            showToast("¡Producto creado exitosamente en el catálogo!", "success");
            return { success: true, product: newProduct };
        } catch (err) {
            console.error("Error al crear producto:", err);
            showToast(err.message || "No se pudo crear el producto", "error");
            return { success: false, error: err.message };
        } finally {
            setSubmitting(false);
        }
    };

    // 3. Editar Producto (Soporta FormData multipart o JSON)
    const updateProduct = async (id, formDataOrObject) => {
        setSubmitting(true);
        setError(null);
        try {
            const isFormData = formDataOrObject instanceof FormData;
            const headers = {
                ...getAuthHeaders(),
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
            };

            const body = isFormData ? formDataOrObject : JSON.stringify(formDataOrObject);

            let response = await fetch(`${API_URL}/products/${id}`, {
                method: "PATCH",
                headers,
                body,
            });

            if (!response.ok && response.status === 404) {
                response = await fetch(`${API_URL}/api/products/${id}`, {
                    method: "PATCH",
                    headers,
                    body,
                });
            }

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || errData.message || `Error al actualizar producto (${response.status})`);
            }

            const updatedProduct = await response.json();

            // Actualizar lista en memoria
            setProducts(prev => prev.map(p => {
                const pId = p._id || p.id;
                return pId === id ? { ...p, ...updatedProduct } : p;
            }));

            showToast("¡Producto actualizado correctamente!", "success");
            return { success: true, product: updatedProduct };
        } catch (err) {
            console.error("Error al actualizar producto:", err);
            showToast(err.message || "No se pudo actualizar el producto", "error");
            return { success: false, error: err.message };
        } finally {
            setSubmitting(false);
        }
    };

    // 4. Eliminar Producto
    const deleteProduct = async (id) => {
        setSubmitting(true);
        setError(null);
        try {
            let response = await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE",
                headers: {
                    ...getAuthHeaders(),
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok && response.status === 404) {
                response = await fetch(`${API_URL}/api/products/${id}`, {
                    method: "DELETE",
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                });
            }

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || errData.message || `Error al eliminar producto (${response.status})`);
            }

            // Quitar de memoria
            setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
            showToast("Producto eliminado del catálogo.", "success");
            return { success: true };
        } catch (err) {
            console.error("Error al eliminar producto:", err);
            showToast(err.message || "No se pudo eliminar el producto", "error");
            return { success: false, error: err.message };
        } finally {
            setSubmitting(false);
        }
    };

    return {
        products,
        loading,
        submitting,
        error,
        toast,
        showToast,
        clearToast,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    };
}

export default useAdminProducts;
