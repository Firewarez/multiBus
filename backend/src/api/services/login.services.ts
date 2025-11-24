// 1. Mudamos a importação: Sai 'db' (pg), entra 'prisma'
import { prisma } from "../../config/prisma";

// 2. Atualizar Usuário existente
export const updateUser = async (
    userId: number, 
    username?: string,
    email?: string,
    cpf?: string,
    telefone?: string,
    passwordHash?: string // Mapeia para password_hash no modelo Prisma
) => {
    // SQL ANTES: UPDATE users SET username = $1, email = $2, ... WHERE id = $6 RETURNING *

    // Filtra apenas os campos que foram fornecidos para atualizar
    const updateData = {
        ...(username && { username }),
        ...(email && { email }),
        ...(cpf && { cpf }),
        ...(telefone && { telefone }),
        ...(passwordHash && { passwordHash }),
    };

    return await prisma.user.update({
        where: {
            id: userId
        },
        data: updateData
    });
};

// 3. Registrar novo Usuário
export const registerUser = async (
    username: string,
    email: string,
    cpf: string,
    telefone: string,
    passwordHash: string
) => {
    // SQL ANTES: INSERT INTO users (username, ...) VALUES ($1, ...) RETURNING *
    // O Prisma já retorna o objeto criado automaticamente
    return await prisma.user.create({
        data: {
            username: username,
            email: email,
            cpf: cpf,
            telefone: telefone,
            passwordHash: passwordHash
        }
    });
};