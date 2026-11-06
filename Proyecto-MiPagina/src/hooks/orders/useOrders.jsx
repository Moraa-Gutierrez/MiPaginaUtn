import { useCallback, useEffect, useState } from 'react';
import { ROUTES } from '../../config.js'; 
import { api } from '../../utils/api.js';
import { orderViewAdapter } from '../../utils/adapters.js';
import useAuth from '../user/useAuth.jsx';

function useOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { isComprador, isStaff } = useAuth();
    const ruta = isStaff ? ROUTES.pedidosTodos : ROUTES.pedidos;

    const ejecutarConCarga = async (accionAsincrona) => {
        try {
            setError(null);
            setLoading(true);
            return await accionAsincrona();
        } catch (err) {
            console.error(err);
            setError(err);
            return { ok: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    const refetch = useCallback(async () => {
        if (!isComprador && !isStaff) return;

        await ejecutarConCarga(async () => {
            const pedidos = await api("GET", ruta);
            setOrders(pedidos.map(orderViewAdapter));
        });
    }, [ruta, isComprador, isStaff]);

    useEffect(() => { 
        refetch(); 
    }, [refetch]);

    const accion = async (metodo, endpoint) => {
        return await ejecutarConCarga(async () => {
            const pedidos = await api(metodo, endpoint);
            await refetch();
            return { ok: true, pedidos: orderViewAdapter(pedidos) };
        });
    };

    const createOrder = () => accion("POST", ROUTES.pedidos);
    const payOrder = (id) => accion("PATCH", `${ROUTES.pedidos}/${id}/pagar`);
    const cancelOrder = (id) => accion("PATCH", `${ROUTES.pedidos}/${id}/cancelar`);

    return { orders, loading, error, refetch, createOrder, payOrder, cancelOrder, verTodos: isStaff };
}

export default useOrders;