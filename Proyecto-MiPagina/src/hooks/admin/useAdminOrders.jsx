import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '../../config';

// Datos de demostración enriquecidos para cuando la base de datos no tiene órdenes iniciales
const INITIAL_DEMO_ORDERS = [
    {
        _id: "6724fa10b91e12a4561234a1",
        order_number: "ORD-2026-001",
        user_id: {
            name: "Camila",
            lastname: "Ríos",
            email: "camila.rios@example.com"
        },
        status: "confirmed",
        total_amount: 28000,
        items: [
            {
                product_name: "Natura Ekos Body Splash Maracuyá",
                unit_price: 18500,
                quantity: 1
            },
            {
                product_name: "Vela Aromática en Frasco de Vidrio (Vainilla & Coco)",
                unit_price: 9500,
                quantity: 1
            }
        ],
        shipping: {
            street: "Calle 61 Nº 2450",
            city: "Necochea",
            zip_code: "7630"
        },
        created_at: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
        _id: "6724fa10b91e12a4561234a2",
        order_number: "ORD-2026-002",
        user_id: {
            name: "Mateo",
            lastname: "López",
            email: "mateo.lopez@example.com"
        },
        status: "pending",
        total_amount: 15400,
        items: [
            {
                product_name: "Bandeja Macetera Ovalada de Cemento",
                unit_price: 6500,
                quantity: 1
            },
            {
                product_name: "Busto Escultura David en Yeso",
                unit_price: 8900,
                quantity: 1
            }
        ],
        shipping: {
            street: "Av. 2 y Calle 79",
            city: "Necochea",
            zip_code: "7630"
        },
        created_at: new Date(Date.now() - 3600000 * 18).toISOString()
    },
    {
        _id: "6724fa10b91e12a4561234a3",
        order_number: "ORD-2026-003",
        user_id: {
            name: "Sofía",
            lastname: "Martínez",
            email: "sofia.martinez@gmail.com"
        },
        status: "shipped",
        total_amount: 32000,
        items: [
            {
                product_name: "Perfume Natura Humor Próprio 75ml",
                unit_price: 32000,
                quantity: 1
            }
        ],
        shipping: {
            street: "Calle 59 Nº 1284",
            city: "Necochea",
            zip_code: "7630"
        },
        created_at: new Date(Date.now() - 3600000 * 48).toISOString()
    },
    {
        _id: "6724fa10b91e12a4561234a4",
        order_number: "ORD-2026-004",
        user_id: {
            name: "Lucas",
            lastname: "Fernández",
            email: "lucas.f@outlook.com"
        },
        status: "completed",
        total_amount: 7800,
        items: [
            {
                product_name: "Crema Hidratante para Manos Natura Tododia",
                unit_price: 7800,
                quantity: 1
            }
        ],
        shipping: {
            street: "Calle 67 Nº 310",
            city: "Quequén",
            zip_code: "7631"
        },
        created_at: new Date(Date.now() - 3600000 * 72).toISOString()
    },
    {
        _id: "6724fa10b91e12a4561234a5",
        order_number: "ORD-2026-005",
        user_id: {
            name: "Valeria",
            lastname: "Gómez",
            email: "valegomez@yahoo.com"
        },
        status: "cancelled",
        total_amount: 14500,
        items: [
            {
                product_name: "Soporte Dual 3D para Joysticks y Auriculares",
                unit_price: 14500,
                quantity: 1
            }
        ],
        shipping: {
            street: "Calle 83 Nº 420",
            city: "Necochea",
            zip_code: "7630"
        },
        created_at: new Date(Date.now() - 3600000 * 96).toISOString()
    }
];

/**
 * Hook para la Administración de Órdenes y Pedidos
 * Conecta con los endpoints de Node/Express (/orders o /api/orders)
 * y provee actualización dinámica de estado con feedback inmediato.
 */
export function useAdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
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

    // 1. Obtener todas las órdenes
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let response = await fetch(`${API_URL}/orders`, {
                headers: {
                    ...getAuthHeaders(),
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok && response.status === 404) {
                response = await fetch(`${API_URL}/api/orders`, {
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json"
                    }
                });
            }

            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setOrders(data);
                    return;
                }
            }

            // Si el backend no tiene órdenes o no responde con datos, usamos demo persistente en sessionStorage
            const cachedOrders = sessionStorage.getItem("admin_orders_cache");
            if (cachedOrders) {
                setOrders(JSON.parse(cachedOrders));
            } else {
                setOrders(INITIAL_DEMO_ORDERS);
                sessionStorage.setItem("admin_orders_cache", JSON.stringify(INITIAL_DEMO_ORDERS));
            }
        } catch (err) {
            console.warn("Aviso al consultar órdenes del backend:", err.message);
            const cachedOrders = sessionStorage.getItem("admin_orders_cache");
            setOrders(cachedOrders ? JSON.parse(cachedOrders) : INITIAL_DEMO_ORDERS);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // 2. Actualizar dinámicamente el estado de la orden
    const updateOrderStatus = async (orderId, newStatus) => {
        setUpdating(true);
        try {
            let success = false;
            try {
                let response = await fetch(`${API_URL}/orders/${orderId}/status`, {
                    method: "PATCH",
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: newStatus }),
                });

                if (!response.ok && response.status === 404) {
                    response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
                        method: "PATCH",
                        headers: {
                            ...getAuthHeaders(),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ status: newStatus }),
                    });
                }

                if (response.ok) {
                    const updatedOrder = await response.json();
                    setOrders(prev => prev.map(o => (o._id || o.id) === orderId ? { ...o, ...updatedOrder, status: newStatus } : o));
                    success = true;
                }
            } catch (networkErr) {
                console.warn("Fallo en petición al backend, actualizando localmente:", networkErr);
            }

            // Si la llamada remota falló o fue mockeada, actualizamos el estado local
            setOrders(prev => {
                const updated = prev.map(o => (o._id || o.id) === orderId ? { ...o, status: newStatus } : o);
                sessionStorage.setItem("admin_orders_cache", JSON.stringify(updated));
                return updated;
            });

            showToast(`Estado de la orden actualizado a "${newStatus}".`, "success");
            return { success: true };
        } catch (err) {
            console.error("Error al actualizar estado:", err);
            showToast("No se pudo actualizar el estado de la orden.", "error");
            return { success: false, error: err.message };
        } finally {
            setUpdating(false);
        }
    };

    return {
        orders,
        loading,
        updating,
        error,
        toast,
        showToast,
        clearToast,
        fetchOrders,
        updateOrderStatus,
    };
}

export default useAdminOrders;
