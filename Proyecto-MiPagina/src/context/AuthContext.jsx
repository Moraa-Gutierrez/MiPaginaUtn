import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const SESSION_KEY = "usuario";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar en sessionStorage y localStorage
    const storedUser = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (e) {
        console.error("Error al parsear el usuario de la sesión", e);
        sessionStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    if (userData?.role) {
      localStorage.setItem("role", userData.role);
    } else if (userData?.email === "mora@mora.com") {
      localStorage.setItem("role", "admin");
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  const simulateAdminLogin = () => {
    const adminUser = {
      id: "admin-master",
      name: "Mora (Admin)",
      lastname: "Gutierrez",
      email: "mora@mora.com",
      role: "admin"
    };
    login(adminUser);
    localStorage.setItem("role", "admin");
  };

  const isAdmin = Boolean(
    user?.role === "admin" ||
    user?.email === "mora@mora.com" ||
    localStorage.getItem("role") === "admin" ||
    sessionStorage.getItem("role") === "admin"
  );

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      simulateAdminLogin,
      isAuthenticated: !!user, 
      isAdmin, 
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}

