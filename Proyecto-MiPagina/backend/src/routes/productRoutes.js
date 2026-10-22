import {Router} from "express";
import * as productController from "../controllers/productController.js";
import { soloStaff } from "../utils/constants.js";
import { subirImagen, manejarErroresDeMulter } from "../middleware/subirImagen.js";

const router = Router();

router.get("/", productController.getProductsController);
router.get("/:id", productController.getProductByIdController);
router.post("/", soloStaff, subirImagen, productController.createProductController);
router.patch("/:id", soloStaff, subirImagen, productController.updateProductController);
router.delete("/:id", soloStaff, productController.deleteProductController);

router.use(manejarErroresDeMulter);

export default router;