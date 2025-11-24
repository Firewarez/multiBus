import { Request, Response } from 'express';
import * as userService from '../services/user.services';
import { z } from 'zod';

export const registerUser = async (req: Request, res: Response) => {
    const userSchema = z.object({
        nome: z.string().min(3),
        email: z.string().email(),
        cpf: z.string().min(11).max(14),
        telefone: z.string().min(10).max(15).optional(),
        nascimento: z.string().transform((val) => new Date(val)),
        senha: z.string().min(6)
    });
    try {
        const userData = userSchema.parse(req.body);
        const newUser = await userService.registerUser(
            userData.nome,
            userData.email,
            userData.cpf,
            userData.telefone,
            userData.senha,
            userData.nascimento
        );
        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const { nome, email, cpf, telefone, senha, nascimento } = req.body;
    try {
        const updatedUser = await userService.updateUser(
            userId,
            nome,
            email,
            cpf,
            telefone,
            senha,
            nascimento ? new Date(nascimento) : undefined
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
