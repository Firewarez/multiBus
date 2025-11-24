import { Router } from "express";
import * as notifController from "../controllers/notif.controller";

const router = Router();

// GET /api/v1/notifications - Lista todas as notificações (com filtros opcionais)
router.get("/", notifController.getAllNotifications);

// GET /api/v1/notifications/active - Lista notificações ativas
router.get("/active", notifController.getActiveNotifications);

// GET /api/v1/notifications/:id - Busca notificação por ID
router.get("/:id", notifController.getNotificationById);

// POST /api/v1/notifications - Cria nova notificação
router.post("/", notifController.createNotification);

// PUT /api/v1/notifications/:id - Atualiza notificação
router.put("/:id", notifController.updateNotification);

// PATCH /api/v1/notifications/:id/toggle - Ativa/Desativa notificação
router.patch("/:id/toggle", notifController.toggleNotificationStatus);

// DELETE /api/v1/notifications/:id - Remove notificação
router.delete("/:id", notifController.deleteNotification);

export default router;