import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CreateProductPage from "./pages/CreateProductPage";
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
                path: "products",
                element: <Products />
            },
            {
                path:"products/category/:category_id",
                element:<Products/>
            },
            {
                path: "create-product",
                element: <CreateProductPage />
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