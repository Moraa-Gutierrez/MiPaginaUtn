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
                path: "/Products",
                element: <Products />
            },
            {
                path: "/Home",
                element: <Home />
            },
            {
                path: "/CreateProductPage",
                element: <CreateProductPage />
            },
            {
                path: "*",
                element: (
                    <div>
                        <h2>Error 404</h2>
                        <p>Pagina no encontrada</p>
                    </div>
                )
            }
        ]
    }

])