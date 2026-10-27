// app.js
import express from "express";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import swaggerUi from "swagger-ui-express";
import {manejarErrores} from "./middleware/manejarErrores.js";
import {especificacion }from "./docs/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(especificacion, {
    customSiteTitle: "Api Docs - M&L Beauty",
    swaggerOptions: { persistAuthorization: true }
}))
//app.use(`/${CARPETA_IMAGENES}`, express.static(CARPETA_IMAGENES))
app.get ("/api-docs.json", (req, res) => {
    res.json(especificacion);
});
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth",authRoutes);


app.use((req, res) => {
    res.status(404).json({ error: "La ruta no existe" })
});
app.use(manejarErrores);

export default app;