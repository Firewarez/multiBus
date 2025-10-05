"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStopFromRoute = exports.addStopToRoute = exports.getRouteStops = exports.getRoutesByLine = exports.deleteRoute = exports.updateRoute = exports.createRoute = exports.getRouteById = exports.getAllRoutes = void 0;
const routesService = __importStar(require("../services/routes.services"));
const getAllRoutes = async (req, res) => {
    try {
        const routes = await routesService.getAllRoutes();
        res.json(routes);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar rotas." });
    }
};
exports.getAllRoutes = getAllRoutes;
const getRouteById = async (req, res) => {
    try {
        const route = await routesService.getRouteById(Number(req.params.id));
        if (!route)
            return res.status(404).json({ error: "Rota não encontrada." });
        res.json(route);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar rota." });
    }
};
exports.getRouteById = getRouteById;
const createRoute = async (req, res) => {
    try {
        const newRoute = await routesService.createRoute(req.body);
        res.status(201).json(newRoute);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar rota." });
    }
};
exports.createRoute = createRoute;
const updateRoute = async (req, res) => {
    try {
        const updated = await routesService.updateRoute(Number(req.params.id), req.body);
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar rota." });
    }
};
exports.updateRoute = updateRoute;
const deleteRoute = async (req, res) => {
    try {
        await routesService.deleteRoute(Number(req.params.id));
        res.json({ message: "Rota removida com sucesso." });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao deletar rota." });
    }
};
exports.deleteRoute = deleteRoute;
const getRoutesByLine = async (req, res) => {
    try {
        const routes = await routesService.getRoutesByLine(Number(req.params.lineId));
        res.json(routes);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar rotas da linha." });
    }
};
exports.getRoutesByLine = getRoutesByLine;
const getRouteStops = async (req, res) => {
    try {
        const stops = await routesService.getRouteStops(Number(req.params.id));
        res.json(stops);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar paradas da rota." });
    }
};
exports.getRouteStops = getRouteStops;
const addStopToRoute = async (req, res) => {
    try {
        const result = await routesService.addStopToRoute(Number(req.params.id), req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao adicionar parada à rota." });
    }
};
exports.addStopToRoute = addStopToRoute;
const removeStopFromRoute = async (req, res) => {
    try {
        await routesService.removeStopFromRoute(Number(req.params.routeId), Number(req.params.stopId));
        res.json({ message: "Parada removida da rota com sucesso." });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao remover parada da rota." });
    }
};
exports.removeStopFromRoute = removeStopFromRoute;
//# sourceMappingURL=routes.controller.js.map