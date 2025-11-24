import { Router } from "express";
import * as loginController from "../controllers/login.controller";


const router = Router();

router.post("/register", loginController.registerUser);
router.put("/update/:id", loginController.updateUser);

export default router;