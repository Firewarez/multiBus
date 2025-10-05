import { Router } from "express";
import * as routesController from "../controllers/routes.controller";

const router = Router();

// CRUD para rotas
router.get("/", routesController.getAllRoutes);
router.get("/:id", routesController.getRouteById);
router.post("/", routesController.createRoute);
router.put("/:id", routesController.updateRoute);
router.delete("/:id", routesController.deleteRoute);

// Endpoints específicos para rotas
router.get("/line/:lineId", routesController.getRoutesByLine);
router.get("/:id/stops", routesController.getRouteStops);
router.post("/:id/stops", routesController.addStopToRoute);
router.delete("/:routeId/stops/:stopId", routesController.removeStopFromRoute);

export default router;