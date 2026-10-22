import {Router} from "express";
import * as userController from "../controllers/userController.js";
import { permitirRoles } from "../middleware/permitirRoles.js";
import { verificarToken } from "../middleware/verificarToken.js";
import { ROLES } from "../utils/constants.js";

const router = Router();

router.use(verificarToken, permitirRoles(ROLES.ADMIN));
router.get("/", userController.getUsersController);
router.get("/:id", userController.getUserByIdController);
router.post("/", userController.createUserController);

export default router;