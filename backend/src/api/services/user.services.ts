import { prisma } from "../../config/prisma";

export const updateUser = async (
    userId: number, 
    nome?: string,
    email?: string,
    cpf?: string,
    telefone?: string,
    senha?: string,
    nascimento?: Date
) => {
    const updateData: any = {};
    if (nome !== undefined) updateData.nome = nome;
    if (email !== undefined) updateData.email = email;
    if (cpf !== undefined) updateData.cpf = cpf;
    if (telefone !== undefined) updateData.telefone = telefone;
    if (senha !== undefined) updateData.senha = senha;
    if (nascimento !== undefined) updateData.nascimento = nascimento;

    return await prisma.usuario.update({
        where: { id: userId },
        data: updateData
    });
};

export const registerUser = async (
    nome: string,
    email: string,
    cpf: string,
    telefone: string | undefined,
    senha: string,
    nascimento: Date
) => {
    return await prisma.usuario.create({
        data: {
            nome,
            email,
            cpf,
            telefone,
            senha,
            nascimento
        }
    });
};

export const getUserById = async (userId: number) => {
    return await prisma.usuario.findUnique({
        where: { id: userId }
    });
};

export const getUserByEmail = async (email: string) => {
    return await prisma.usuario.findUnique({
        where: { email }
    });
};

export const getAllUsers = async () => {
    return await prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            email: true,
            cpf: true,
            telefone: true,
            nascimento: true
        }
    });
};

export const deleteUser = async (userId: number) => {
    return await prisma.usuario.delete({
        where: { id: userId }
    });
};