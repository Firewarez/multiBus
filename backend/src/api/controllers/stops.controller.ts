import { Request, Response } from "express";
import * as stopsService from "../services/stops.services";
import { z } from "zod";

const StopSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
});

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
        console.error(error); // Isso mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar parada." });
    }
};

export const createStop = async (req: Request, res: Response) => {
    try {
        console.log('Corpo da requisição:', req.body);
        const result = StopSchema.safeParse(req.body);
        if (!result.success) {
            console.log('Erro de validação:', result.error.issues);
            return res.status(400).json({ errors: result.error.issues });
        }
        console.log('Dados validados:', result.data);
        const newStop = await stopsService.createStop(result.data);
        console.log('Parada criada:', newStop);
        res.status(201).json(newStop);
    } catch (error) {
        console.error('Erro detalhado:', error);
        res.status(500).json({ error: "Erro ao criar parada." });
    }
};

export const updateStop = async (req: Request, res: Response) => {
    try {
        const result = StopSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.issues });
        }
        // Checagens extras se necessário
        const updatePayload = result.data;
        const updated = await stopsService.updateStop(Number(req.params.id), updatePayload);
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