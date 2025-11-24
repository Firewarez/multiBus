import { Request, Response } from "express";
import * as notifService from "../services/notif.services";

export const getAllNotifications = async (req: Request, res: Response) => {
    try {
        const { is_active, type, priority } = req.query;

        const filters: any = {};
        if (is_active !== undefined) {
            filters.is_active = is_active === "true";
        }
        if (type) {
            filters.type = type;
        }
        if (priority) {
            filters.priority = priority;
        }

        const notifications = await notifService.getAllNotifications(filters);
        res.json(notifications);
    } catch (error) {
        console.error("Erro ao buscar notificações:", error);
        res.status(500).json({ error: "Erro ao buscar notificações" });
    }
};

export const getActiveNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await notifService.getActiveNotifications();
        res.json(notifications);
    } catch (error) {
        console.error("Erro ao buscar notificações ativas:", error);
        res.status(500).json({ error: "Erro ao buscar notificações ativas" });
    }
};

export const getNotificationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notification = await notifService.getNotificationById(parseInt(id));

        if (!notification) {
            return res.status(404).json({ error: "Notificação não encontrada" });
        }

        res.json(notification);
    } catch (error) {
        console.error("Erro ao buscar notificação:", error);
        res.status(500).json({ error: "Erro ao buscar notificação" });
    }
};

export const createNotification = async (req: Request, res: Response) => {
    try {
        const {
            type,
            title,
            description,
            is_active,
            priority,
            start_date,
            end_date,
            affected_lines,
            affected_stops,
        } = req.body;

        if (!type || !title) {
            return res
                .status(400)
                .json({ error: "Tipo e título são obrigatórios" });
        }

        const validTypes = ["aviso", "informacao", "atraso", "emergencia", "manutencao"];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ error: "Tipo de notificação inválido" });
        }

        const validPriorities = ["baixa", "media", "alta", "urgente"];
        if (priority && !validPriorities.includes(priority)) {
            return res.status(400).json({ error: "Prioridade inválida" });
        }

        const notification = await notifService.createNotification({
            type,
            title,
            description,
            is_active,
            priority,
            start_date,
            end_date,
            affected_lines,
            affected_stops,
        });

        res.status(201).json(notification);
    } catch (error) {
        console.error("Erro ao criar notificação:", error);
        res.status(500).json({ error: "Erro ao criar notificação" });
    }
};

export const updateNotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            type,
            title,
            description,
            is_active,
            priority,
            start_date,
            end_date,
            affected_lines,
            affected_stops,
        } = req.body;

        if (type) {
            const validTypes = ["aviso", "informacao", "atraso", "emergencia", "manutencao"];
            if (!validTypes.includes(type)) {
                return res.status(400).json({ error: "Tipo de notificação inválido" });
            }
        }

        if (priority) {
            const validPriorities = ["baixa", "media", "alta", "urgente"];
            if (!validPriorities.includes(priority)) {
                return res.status(400).json({ error: "Prioridade inválida" });
            }
        }

        const notification = await notifService.updateNotification(parseInt(id), {
            type,
            title,
            description,
            is_active,
            priority,
            start_date,
            end_date,
            affected_lines,
            affected_stops,
        });

        if (!notification) {
            return res.status(404).json({ error: "Notificação não encontrada" });
        }

        res.json(notification);
    } catch (error) {
        console.error("Erro ao atualizar notificação:", error);
        res.status(500).json({ error: "Erro ao atualizar notificação" });
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notification = await notifService.deleteNotification(parseInt(id));

        if (!notification) {
            return res.status(404).json({ error: "Notificação não encontrada" });
        }

        res.json({ message: "Notificação removida com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar notificação:", error);
        res.status(500).json({ error: "Erro ao deletar notificação" });
    }
};

export const toggleNotificationStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notification = await notifService.toggleNotificationStatus(
            parseInt(id)
        );

        if (!notification) {
            return res.status(404).json({ error: "Notificação não encontrada" });
        }

        res.json(notification);
    } catch (error) {
        console.error("Erro ao alternar status da notificação:", error);
        res.status(500).json({ error: "Erro ao alternar status da notificação" });
    }
};
