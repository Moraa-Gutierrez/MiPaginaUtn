import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CreateProductPage from "./pages/CRUD/CreateProductPage";
import EditProductPage from "./pages/CRUD/EditProductPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import QuienesSomos from "./pages/QuienesSomos";
import AdminProducts from "./pages/AdminProducts";
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
            {
                path: "create-product",
                element: <CreateProductPage />
            },
            {
                path: "edit-product/:id",
                element: <EditProductPage />
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
                path: "*",
                element: (
                    <div>
                        <h2>⚠️⁴⁰⁴ Error ⁴⁰⁴⚠️</h2>
                        <p>Pagina no encontrada</p>
                    </div>
                )
            }
        ]
    }

])