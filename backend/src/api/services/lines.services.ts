// 1. Mudamos a importação: Sai 'db' (pg), entra 'prisma'
import { prisma } from "../../config/prisma";

// 2. Buscar todas as linhas
export const getAllLines = async () => {
    // SQL ANTES: SELECT * FROM lines ORDER BY id
    return await prisma.line.findMany({
        orderBy: {
            id: 'asc' // Ordenação crescente
        }
    });
};

// 3. Buscar linha por ID
export const getLineById = async (id: number) => {
    // SQL ANTES: SELECT * FROM lines WHERE id = $1
    return await prisma.line.findUnique({
        where: {
            id: id
        }
    });
};

// 4. Criar nova linha
export const createLine = async (line: { code: string; name: string }) => {
    // SQL ANTES: INSERT INTO ... RETURNING *
    // O Prisma já retorna o objeto criado automaticamente
    return await prisma.line.create({
        data: {
            code: line.code,
            name: line.name
        }
    });
};

// 5. Atualizar linha existente
export const updateLine = async (id: number, line: { code: string; name: string }) => {
    // SQL ANTES: UPDATE ... WHERE id = $3 RETURNING *
    return await prisma.line.update({
        where: {
            id: id
        },
        data: {
            code: line.code,
            name: line.name
        }
    });
};

// 6. Deletar linha
export const deleteLine = async (id: number) => {
    // SQL ANTES: DELETE FROM lines WHERE id = $1
    await prisma.line.delete({
        where: {
            id: id
        }
    });
};