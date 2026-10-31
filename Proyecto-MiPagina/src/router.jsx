import { createBrowserRouter, Navigate } from "react-router-dom"; 
import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CreateProductPage from "./pages/CRUD/CreateProductPage";
import EditProductPage from "./pages/CRUD/EditProductPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import QuienesSomos from "./pages/QuienesSomos";
import Login from "./pages/Login-Registro/Login";
import Register from "./pages/Login-Registro/Register";

// Rutas de Administración y Protección
import AdminRoute from "./components/Admin/AdminRoute";
import ProductManagementPage from "./pages/Admin/ProductManagementPage";
import OrderManagementPage from "./pages/Admin/OrderManagementPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "contact",
                element: <ContactPage />
            },
            {
                path: "products",
                element: <Products />
            },
            {
                path: "products/category/:category_id",
                element: <Products />
            },
            // Paneles de Administración Protegidos por Rol
            {
                path: "admin",
                element: (
                    <AdminRoute>
                        <Navigate to="/admin/products" replace />
                    </AdminRoute>
                )
            },
            {
                path: "admin/products",
                element: (
                    <AdminRoute>
                        <ProductManagementPage />
                    </AdminRoute>
                )
            },
            {
                path: "admin/orders",
                element: (
                    <AdminRoute>
                        <OrderManagementPage />
                    </AdminRoute>
                )
            },
            {
                path: "create-product",
                element: (
                    <AdminRoute>
                        <CreateProductPage />
                    </AdminRoute>
                )
            },
            {
                path: "edit-product/:id",
                element: (
                    <AdminRoute>
                        <EditProductPage />
                    </AdminRoute>
                )
            },
            {
                path: "quienessomos",
                element: <QuienesSomos />
            },
            {
                path: "cart",
                element: <CartPage />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "log-in",
                element: <Login/>
            },
            {
                path: "*",
                element: (
                    <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'Arimo, sans-serif' }}>
                        <h2 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '60px', color: '#b79067' }}>
                            ⚠️ Error 404 ⚠️
                        </h2>
                        <p style={{ color: '#464d5d', fontSize: '18px' }}>Página no encontrada</p>
                    </div>
                )
            }
        ]
    }
]);