// 1. Mudamos a importação: Sai 'db' (pg), entra 'prisma'
import { prisma } from "../../config/prisma";

// 2. Buscar todas as Rotas, incluindo informações da Linha
export const getAllRoutes = async () => {
    // SQL ANTES: SELECT r.*, l.code as line_code, l.name as line_name FROM routes r JOIN lines l ON r.line_id = l.id ORDER BY l.code, r.direction
    return await prisma.route.findMany({
        orderBy: [
            { lineId: 'asc' }, // Ordena por Line ID (ou outro campo que mapeie para o código da linha)
            { direction: 'asc' }
        ],
        // O método 'include' é usado para fazer JOINs no Prisma
        include: {
            line: { // Assumindo que o campo de relação se chama 'line'
                select: {
                    code: true, // Seleciona apenas o código
                    name: true  // Seleciona apenas o nome
                }
            }
        }
    });
};

// 3. Buscar Rota por ID, incluindo informações da Linha
export const getRouteById = async (id: number) => {
    // SQL ANTES: SELECT r.*, l.code as line_code, l.name as line_name FROM routes r JOIN lines l ON r.line_id = l.id WHERE r.id = $1
    return await prisma.route.findUnique({
        where: {
            id: id
        },
        include: {
            line: {
                select: {
                    code: true,
                    name: true
                }
            }
        }
    });
};

// 4. Criar nova Rota
export const createRoute = async (route: { line_id: number; direction: string }) => {
    // SQL ANTES: INSERT INTO routes (line_id, direction) VALUES ($1, $2) RETURNING *
    // O Prisma já retorna o objeto criado automaticamente
    return await prisma.route.create({
        data: {
            lineId: route.line_id, // Assumindo 'lineId' como camelCase no Prisma
            direction: route.direction
        }
    });
};

// 5. Atualizar Rota existente
export const updateRoute = async (id: number, route: { line_id?: number; direction?: string }) => {
    // SQL ANTES: UPDATE routes SET line_id = $1, direction = $2 WHERE id = $3 RETURNING *

    // Filtra apenas os campos que foram fornecidos para atualizar
    const updateData = {
        ...(route.line_id && { lineId: route.line_id }),
        ...(route.direction && { direction: route.direction }),
    };
    
    return await prisma.route.update({
        where: {
            id: id
        },
        data: updateData
    });
};

// 6. Deletar Rota
export const deleteRoute = async (id: number) => {
    // SQL ANTES: DELETE FROM routes WHERE id = $1
    await prisma.route.delete({
        where: {
            id: id
        }
    });
};

// 7. Buscar Rotas por Linha
export const getRoutesByLine = async (lineId: number) => {
    // SQL ANTES: SELECT * FROM routes WHERE line_id = $1
    return await prisma.route.findMany({
        where: {
            lineId: lineId
        }
    });
};

// 8. Buscar Paradas (Stops) de uma Rota (com a ordem)
export const getRouteStops = async (routeId: number) => {
    // SQL ANTES: SELECT s.*, rs.stop_order FROM stops s JOIN route_stops rs ON s.id = rs.stop_id WHERE rs.route_id = $1 ORDER BY rs.stop_order
    return await prisma.routeStop.findMany({ // Usando o modelo de junção explícito RouteStop
        where: {
            routeId: routeId
        },
        // 'include' para buscar os detalhes da Parada ('Stop')
        include: {
            stop: true // Assumindo que o campo de relação se chama 'stop'
        },
        orderBy: {
            stop_order: 'asc' // Ordena pela ordem da parada
        }
    });
};

// 9. Adicionar Parada à Rota (na tabela de junção)
export const addStopToRoute = async (routeId: number, stopData: { stop_id: number; stop_order: number }) => {
    // SQL ANTES: INSERT INTO route_stops (route_id, stop_id, stop_order) VALUES ($1, $2, $3) RETURNING *
    return await prisma.routeStop.create({
        data: {
            routeId: routeId,
            stopId: stopData.stop_id,
            stop_order: stopData.stop_order // Usando 'stop_order' conforme definido no schema Prisma
        }
    });
};

// 10. Remover Parada da Rota (na tabela de junção)
export const removeStopFromRoute = async (routeId: number, stopId: number) => {
    // SQL ANTES: DELETE FROM route_stops WHERE route_id = $1 AND stop_id = $2
    await prisma.routeStop.deleteMany({ // Usamos 'deleteMany' para garantir que a exclusão composta funcione
        where: {
            routeId: routeId,
            stopId: stopId
        }
    });
};