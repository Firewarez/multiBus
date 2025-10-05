import { Request, Response } from "express";
import * as linesService from "../services/lines.services";

export const getAllLines = async (req: Request, res: Response) => {
    try {
        const lines = await linesService.getAllLines();
        res.json(lines);
    } catch {
        res.status(500).json({ error: "Erro ao buscar linhas." });
    }
};

export const getLineById = async (req: Request, res: Response) => {
    try {
        const line = await linesService.getLineById(Number(req.params.id));
        if (!line) return res.status(404).json({ error: "Linha não encontrada." });
        res.json(line);
    } catch {
        res.status(500).json({ error: "Erro ao buscar linha." });
    }
};

export const createLine = async (req: Request, res: Response) => {
    try {
        const newLine = await linesService.createLine(req.body);
        res.status(201).json(newLine);
    } catch {
        res.status(500).json({ error: "Erro ao criar linha." });
    }
};

export const updateLine = async (req: Request, res: Response) => {
    try {
        const updated = await linesService.updateLine(Number(req.params.id), req.body);
        res.json(updated);
    } catch {
        res.status(500).json({ error: "Erro ao atualizar linha." });
    }
};

export const deleteLine = async (req: Request, res: Response) => {
    try {
        await linesService.deleteLine(Number(req.params.id));
        res.json({ message: "Linha removida com sucesso." });
    } catch {
        res.status(500).json({ error: "Erro ao deletar linha." });
    }
};