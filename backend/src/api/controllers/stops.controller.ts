import { Request, Response } from "express";
import * as stopsService from "../services/stops.services";

export const getAllStops = async (req: Request, res: Response) => {
    try {
        const stops = await stopsService.getAllStops();
        res.json(stops);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar paradas." });
    }
};

export const getStopById = async (req: Request, res: Response) => {
    try {
        const stop = await stopsService.getStopById(Number(req.params.id));
        if (!stop) return res.status(404).json({ error: "Parada não encontrada." });
        res.json(stop);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar parada." });
    }
};

export const createStop = async (req: Request, res: Response) => {
    try {
        const newStop = await stopsService.createStop(req.body);
        res.status(201).json(newStop);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar parada." });
    }
};

export const updateStop = async (req: Request, res: Response) => {
    try {
        const updated = await stopsService.updateStop(Number(req.params.id), req.body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar parada." });
    }
};

export const deleteStop = async (req: Request, res: Response) => {
    try {
        await stopsService.deleteStop(Number(req.params.id));
        res.json({ message: "Parada removida com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar parada." });
    }
};