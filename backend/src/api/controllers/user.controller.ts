import { Request, Response } from 'express';
import * as userService from '../services/user.services';
import { z } from 'zod';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body;
        
        if (!email || !senha) {
            return res.status(400).json({ error: "Email e senha são obrigatórios" });
        }

        const user = await userService.getUserByEmail(email);
        
        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        // ATENÇÃO: Em produção, use bcrypt para comparar senhas!
        if (user.senha !== senha) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        // Remove senha da resposta
        const { senha: _, ...userWithoutPassword } = user;
        
        res.status(200).json({ 
            message: "Login realizado com sucesso",
            usuario: userWithoutPassword 
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        
        if (isNaN(userId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const user = await userService.getUserById(userId);
        
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Remove senha da resposta
        const { senha: _, ...userWithoutPassword } = user;
        
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const registerUser = async (req: Request, res: Response) => {
    console.log('📝 Tentativa de registro de usuário:', {
        body: { ...req.body, senha: '***' }
    });
    
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
        console.log('✅ Validação Zod passou');
        
        // Verificar se email já existe
        console.log('🔍 Verificando se email existe:', userData.email);
        const existingUser = await userService.getUserByEmail(userData.email);
        
        if (existingUser) {
            console.log('⚠️ Email já cadastrado:', userData.email);
            return res.status(409).json({ 
                error: "E-mail já cadastrado",
                message: "Este e-mail já está em uso. Tente fazer login ou use outro e-mail." 
            });
        }
        
        console.log('✅ Email disponível, criando usuário...');
        const newUser = await userService.registerUser(
            userData.nome,
            userData.email,
            userData.cpf,
            userData.telefone,
            userData.senha,
            userData.nascimento
        );
        
        console.log('✅ Usuário criado com sucesso, ID:', newUser.id);
        
        // Remove senha da resposta
        const { senha: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log('❌ Erro de validação Zod:', error.issues);
            res.status(400).json({ errors: error.issues });
        } else {
            console.error('❌ Erro ao registrar usuário:', error);
            res.status(500).json({ 
                error: "Internal server error",
                details: error instanceof Error ? error.message : 'Erro desconhecido'
            });
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
