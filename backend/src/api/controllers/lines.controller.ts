import { Request, Response } from "express";
import * as linesService from "../services/lines.services";
import { z } from "zod";

// 1. Define Zod schema
const LineSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    color: z.string(),
    // add other fields as needed
});

// 2. Use Zod type for TypeScript
type Line = z.infer<typeof LineSchema>;

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
        if (!line) return res.status(404).json({ error: "Linha nÃ£o encontrada." });
        res.json(line);
    } catch {
        console.error(Error); // Isso mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar linha." });
    }
};

export const createLine = async (req: Request, res: Response) => {
    try {
        const line: { code: string; name: string } = {
            code: req.body.code,
            name: req.body.name,
        };
        const newLine = await linesService.createLine(line);
        res.status(201).json(newLine);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.issues });
        }
        console.error(error); // Isso mostra o erro real no terminal
        res.status(500).json({ error: "Internal server error" });
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