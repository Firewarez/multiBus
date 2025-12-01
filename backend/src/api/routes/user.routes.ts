import { Router } from "express";
import * as userController from "../controllers/user.controller";


const router = Router();

// Rotas de autenticação (rotas específicas primeiro)
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);

// Rotas de usuário (rotas específicas antes das rotas com parâmetros)
router.get("/", userController.getAllUsers);
router.post("/", userController.registerUser); // Alias para compatibilidade
router.get("/:id", userController.getUserById);
router.put("/update/:id", userController.updateUser);
router.put("/:id", userController.updateUser); // Alias para compatibilidade

export default router;