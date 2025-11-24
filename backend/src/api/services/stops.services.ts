// 1. Mudamos a importação: Sai 'db' (pg), entra 'prisma'
import { prisma } from "../../config/prisma";

// 2. Buscar todas as Paradas
export const getAllStops = async () => {
    // SQL ANTES: SELECT * FROM stops ORDER BY id
    return await prisma.stop.findMany({
        orderBy: {
            id: 'asc' // Ordenação crescente
        }
    });
};

// 3. Buscar Parada por ID
export const getStopById = async (id: number) => {
    // SQL ANTES: SELECT * FROM stops WHERE id = $1
    return await prisma.stop.findUnique({
        where: {
            id: id
        }
    });
};

// 4. Criar nova Parada
export const createStop = async (stop: { name: string; latitude: number; longitude: number }) => {
    // SQL ANTES: INSERT INTO stops (name, latitude, longitude) VALUES ($1, $2, $3) RETURNING *
    // O Prisma já retorna o objeto criado automaticamente
    return await prisma.stop.create({
        data: {
            name: stop.name,
            latitude: stop.latitude,
            longitude: stop.longitude
        }
    });
};

// 5. Atualizar Parada existente
export const updateStop = async (id: number, stop: { name?: string; latitude?: number; longitude?: number }) => {
    // SQL ANTES: UPDATE stops SET name = $1, latitude = $2, longitude = $3 WHERE id = $4 RETURNING *
    
    // Opcionalidade nos campos para permitir atualização parcial
    const updateData = {
        ...(stop.name && { name: stop.name }),
        ...(stop.latitude && { latitude: stop.latitude }),
        ...(stop.longitude && { longitude: stop.longitude }),
    };

    return await prisma.stop.update({
        where: {
            id: id
        },
        data: updateData
    });
};

// 6. Deletar Parada
export const deleteStop = async (id: number) => {
    // SQL ANTES: DELETE FROM stops WHERE id = $1
    await prisma.stop.delete({
        where: {
            id: id
        }
    });
};