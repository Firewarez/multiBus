import { Router } from "express";
import * as userController from "../controllers/user.controller";


const router = Router();

// Rotas de autenticação
router.post("/login", userController.loginUser);

// Rotas de usuário
router.post("/register", userController.registerUser);
router.post("/", userController.registerUser); // Alias para compatibilidade
router.get("/:id", userController.getUserById);
router.put("/update/:id", userController.updateUser);
router.put("/:id", userController.updateUser); // Alias para compatibilidade

export default router;