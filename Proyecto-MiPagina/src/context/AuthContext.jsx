import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const SESSION_KEY = "usuario";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 

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

    const login = (userData) => {
        setUser(userData);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem(SESSION_KEY);
    };

    // Función para simular el acceso de administrador rápidamente desde la vista protegida
    const simulateAdminLogin = () => {
        const adminUser = {
            name: "Mora (Admin)",
            email: "mora@mora.com",
            role: "admin"
        };
        login(adminUser);
    };

    const isAdmin = user?.role === 'admin' || user?.rol === 'admin' || user?.isAdmin === true || user?.email === "mora@mora.com";

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            error, 
            isAuthenticated: user !== null, 
            isAdmin, 
            loading, 
            simulateAdminLogin 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
}