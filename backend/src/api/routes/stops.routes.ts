import { Router } from "express";
import * as stopsController from "../controllers/stops.controller";

const router = Router();

router.get("/", stopsController.getAllStops);
router.get("/:id", stopsController.getStopById);
router.post("/", stopsController.createStop);
router.put("/:id", stopsController.updateStop);
router.delete("/:id", stopsController.deleteStop);

export default router;