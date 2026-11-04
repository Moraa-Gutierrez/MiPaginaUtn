import { createContext, useContext, useState, useEffect } from "react";

// 1. Creamos el contexto de autenticación
const AuthContext = createContext();

const SESSION_KEY = "usuario";

// 2. Creamos el Proveedor que envolverá a la app
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // Al cargar la app, leemos la sesión si existe
    useEffect(() => {
        const storedUser = sessionStorage.getItem(SESSION_KEY);
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Error al parsear el usuario de la sesión:", err);
                setError(err);
            }
        }
    }, []);

    // Crear sesión, actualizar estado global y guardar en sessionStorage
    const login = (userData) => {
        setUser(userData);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    };

    // Destruir sesión y limpiar estado global
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem(SESSION_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error, isAuthenticated: user !== null }}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. Hook personalizado para consumir el contexto fácilmente
export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
}