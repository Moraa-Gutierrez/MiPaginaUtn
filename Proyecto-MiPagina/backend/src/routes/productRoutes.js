import {Router} from "express";
import * as productController from "../controllers/productController.js";
import { soloStaff } from "../utils/constants.js";

import{subirImagen,manejarErroresDeMulter} from "../middleware/subirImagen.js";

const router = Router();
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", soloStaff, subirImagen, productController.createProduct);
router.patch("/:id", soloStaff, subirImagen, productController.updateProduct);
router.delete("/:id", soloStaff, productController.deleteProduct);
router.use(manejarErroresDeMulter)

export default router
