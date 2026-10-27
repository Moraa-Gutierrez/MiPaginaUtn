import {Router} from "express";
import {verificarToken} from "../middleware/verificarToken.js";
import * as authController from "../controllers/authController.js"
const router = Router()
router.post("/registro", authController.registrarController)
router.post("/login",authController.loginController)
router.get("/perfil",verificarToken,authController.perfilController)
export default router