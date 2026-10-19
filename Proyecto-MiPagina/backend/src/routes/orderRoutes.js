import { Router } from "express";
import * as orderController from "../controllers/orderController.js";
import { permitirRoles } from "../middleware/permitirRoles.js";
import { verificarToken } from "../middleware/verificarToken.js";
import { ROLES } from "../utils/constants.js";

const router = Router();

router.use(verificarToken);

// 🛒 RUTAS DEL CARRITO (status: 'draft')
router.get("/orders", permitirRoles(ROLES.COMPRADOR), orderController.getOrCreateCartController);
router.post("/items", permitirRoles(ROLES.COMPRADOR), orderController.addToCartController);
router.delete("/items/:productId", permitirRoles(ROLES.COMPRADOR), orderController.removeFromCartController);

// 💳 CHECKOUT Y COMPRA
router.post("/checkout", permitirRoles(ROLES.COMPRADOR), orderController.checkoutOrderController);

// 📜 HISTORIAL DE PEDIDOS CONFIRMADOS
router.get("/my-orders", permitirRoles(ROLES.COMPRADOR), orderController.getUserOrderController);

export default router;