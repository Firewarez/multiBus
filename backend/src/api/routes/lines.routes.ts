// Importa o objeto Router do Express
// Router permite criar rotas de forma modular e organizada
import { Router } from "express";
import * as linesController from "../controllers/lines.controller";

const router = Router();

//Definições das Rotas
router.get("/", linesController.getAllLines);
router.get("/:id", linesController.getLineById);
router.post("/", linesController.createLine);
router.put("/:id", linesController.updateLine);
router.delete("/:id", linesController.deleteLine);

export default router;