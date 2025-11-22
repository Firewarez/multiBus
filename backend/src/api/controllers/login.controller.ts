import {Request, Response} from 'express';
import * as loginService from '../services/login.services';
import {z} from 'zod';




export const registerUser = async (req: Request, res: Response) => {
    const userSchema = z.object({
        username: z.string().min(3),
        email: z.string().email(),
        cpf: z.string().min(11).max(14),
        telefone: z.string().min(10).max(15),
        nascimento: z.string().optional(),
        password: z.string().min(6)
    });
    try {
        const userData = userSchema.parse(req.body);
        const newUser = await loginService.registerUser(
            userData.username,
            userData.email,
            userData.cpf,
            userData.telefone,
            userData.password
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
    const userId = req.params.id;
    const { username, email, cpf, telefone, password } = req.body;
    try {
        const updatedUser = await loginService.updateUser(
            userId,
            username,
            email,
            cpf,
            telefone,
            password
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
