import { useState, useEffect, useCallback } from 'react';
import { api } from '../../utils/api';

/**
 * Hook para la Administración de Usuarios
 * Conecta con los endpoints de Node/Express (/api/users)
 * y provee actualización dinámica de roles y estado/bajas.
 */
export function useAdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const clearToast = () => {
        setToast(null);
    };

    // 1. Obtener lista completa de usuarios
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api("GET", "/users");
            if (Array.isArray(data)) {
                setUsers(data);
                return;
            }
        } catch (err) {
            console.error("Error al obtener usuarios:", err.message);
            setError(err.message);
            showToast("No se pudieron cargar los usuarios del servidor.", "error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // 2. Actualizar rol de usuario (customer/comprador vs admin)
    const updateUserRole = async (userId, newRole) => {
        setUpdating(true);
        try {
            const updatedUser = await api("PUT", `/users/${userId}/role`, {
                role: newRole
            });

            const resolvedRole = newRole === "customer" ? "comprador" : newRole;

            setUsers(prev => prev.map(u => 
                (u._id || u.id) === userId ? { ...u, ...(updatedUser || {}), role: resolvedRole } : u
            ));

            showToast(`Rol del usuario actualizado a "${newRole}".`, "success");
            return { success: true, user: updatedUser };
        } catch (err) {
            console.error("Error al actualizar rol de usuario:", err);
            showToast(err.message || "No se pudo actualizar el rol.", "error");
            return { success: false, error: err.message };
        } finally {
            setUpdating(false);
        }
    };

    // 3. Cambiar estado de activación (dar de baja o reactivar)
    const toggleUserStatus = async (userId, newActiveState) => {
        setUpdating(true);
        try {
            const updatedUser = await api("PUT", `/users/${userId}/status`, {
                active: newActiveState
            });

            setUsers(prev => prev.map(u => 
                (u._id || u.id) === userId ? { ...u, ...(updatedUser || {}), active: newActiveState } : u
            ));

            showToast(
                newActiveState ? "Usuario reactivado con éxito." : "Usuario dado de baja con éxito.",
                "success"
            );
            return { success: true, user: updatedUser };
        } catch (err) {
            console.error("Error al cambiar estado de usuario:", err);
            showToast(err.message || "No se pudo cambiar el estado del usuario.", "error");
            return { success: false, error: err.message };
        } finally {
            setUpdating(false);
        }
    };

    // 4. Baja de usuario (DELETE)
    const deleteUser = async (userId) => {
        setUpdating(true);
        try {
            await api("DELETE", `/users/${userId}`);

            setUsers(prev => prev.map(u => 
                (u._id || u.id) === userId ? { ...u, active: false } : u
            ));

            showToast("Usuario dado de baja con éxito.", "success");
            return { success: true };
        } catch (err) {
            console.error("Error al dar de baja usuario:", err);
            showToast(err.message || "No se pudo dar de baja al usuario.", "error");
            return { success: false, error: err.message };
        } finally {
            setUpdating(false);
        }
    };

    return {
        users,
        loading,
        updating,
        error,
        toast,
        showToast,
        clearToast,
        fetchUsers,
        updateUserRole,
        toggleUserStatus,
        deleteUser
    };
}

export default useAdminUsers;

