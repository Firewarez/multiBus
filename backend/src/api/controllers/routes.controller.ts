import { Request, Response } from "express";
import * as routesService from "../services/routes.services";
import { z } from "zod";

// 1. Defina o schema Zod para uma rota
const RouteSchema = z.object({
    id: z.number().optional(),
    line_id: z.number(),
    direction: z.string().refine((val) => val === 'ida' || val === 'volta', {
        message: "Direction deve ser 'ida' ou 'volta'"
    }),
});

// 2. Tipo TypeScript inferido
type Route = z.infer<typeof RouteSchema>;

export const getAllRoutes = async (req: Request, res: Response) => {
    try {
        const routes = await routesService.getAllRoutes();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar rotas." });
    }
};

export const getRouteById = async (req: Request, res: Response) => {
    try {
        const route = await routesService.getRouteById(Number(req.params.id));
        if (!route) return res.status(404).json({ error: "Rota não encontrada." });
        res.json(route);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar rota." });
    }
};


export const createRoute = async (req: Request, res: Response) => {
    try {
        const result = RouteSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.issues });
        }
        
        const { line_id, direction } = result.data;
        const newRoute = await routesService.createRoute({ line_id, direction });
        res.status(201).json(newRoute);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar rota." });
    }
};


export const updateRoute = async (req: Request, res: Response) => {
    try {
        const result = RouteSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.issues });
        }
        
        const { line_id, direction } = result.data;
        const updated = await routesService.updateRoute(Number(req.params.id), { line_id, direction });
        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar rota." });
    }
};
export const deleteRoute = async (req: Request, res: Response) => {
    try {
        await routesService.deleteRoute(Number(req.params.id));
        res.json({ message: "Rota removida com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar rota." });
    }
};

export const getRoutesByLine = async (req: Request, res: Response) => {
    try {
        const routes = await routesService.getRoutesByLine(Number(req.params.lineId));
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar rotas da linha." });
    }
};

export const getRouteStops = async (req: Request, res: Response) => {
    try {
        const stops = await routesService.getRouteStops(Number(req.params.id));
        res.json(stops);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar paradas da rota." });
    }
};

export const addStopToRoute = async (req: Request, res: Response) => {
    try {
        const result = await routesService.addStopToRoute(Number(req.params.id), req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar parada à rota." });
    }
};

export const removeStopFromRoute = async (req: Request, res: Response) => {
    try {
        await routesService.removeStopFromRoute(Number(req.params.routeId), Number(req.params.stopId));
        res.json({ message: "Parada removida da rota com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover parada da rota." });
    }
};