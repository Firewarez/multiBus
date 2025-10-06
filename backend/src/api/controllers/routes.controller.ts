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
// 3. Controlador para encontrar uma rota existente por id
export const getRouteById = async (req: Request, res: Response) => {
    try {
        const route = await routesService.getRouteById(Number(req.params.id));
        if (!route) return res.status(404).json({ error: "Rota não encontrada." });
        res.json(route);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar rota." });
    }
};

// 4. Controlador para criar uma rota 
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

// 5. Controlador para atualizar uma rota existente
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
// 6. Controlador para deletar uma rota 
export const deleteRoute = async (req: Request, res: Response) => {
    try {
        await routesService.deleteRoute(Number(req.params.id));
        res.json({ message: "Rota removida com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar rota." });
    }
};
// 7. Controlador para achar uma rota pela linha
export const getRoutesByLine = async (req: Request, res: Response) => {
    try {
        const routes = await routesService.getRoutesByLine(Number(req.params.lineId));
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar rotas da linha." });
    }
};
// 7. Controlador para achar as paradas de uma rota
export const getRouteStops = async (req: Request, res: Response) => {
    try {
        const stops = await routesService.getRouteStops(Number(req.params.id));
        res.json(stops);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar paradas da rota." });
    }
};
// 8. Controlador para adicionar uma parada a uma rota
export const addStopToRoute = async (req: Request, res: Response) => {
    try {
        const result = await routesService.addStopToRoute(Number(req.params.id), req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar parada à rota." });
    }
};
// 9. Controlador para retirar as paradas de uma rota
export const removeStopFromRoute = async (req: Request, res: Response) => {
    try {
        await routesService.removeStopFromRoute(Number(req.params.routeId), Number(req.params.stopId));
        res.json({ message: "Parada removida da rota com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover parada da rota." });
    }
};