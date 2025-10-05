import db from "../../config/db";

export const getAllRoutes = async () => {
    const result = await db.query(`
        SELECT r.*, l.code as line_code, l.name as line_name 
        FROM routes r
        JOIN lines l ON r.line_id = l.id
        ORDER BY l.code, r.direction
    `);
    return result.rows;
};

export const getRouteById = async (id: number) => {
    const result = await db.query(`
        SELECT r.*, l.code as line_code, l.name as line_name 
        FROM routes r
        JOIN lines l ON r.line_id = l.id
        WHERE r.id = $1
    `, [id]);
    return result.rows[0];
};

export const createRoute = async (route: { line_id: number; direction: string }) => {
    const result = await db.query(
        "INSERT INTO routes (line_id, direction) VALUES ($1, $2) RETURNING *",
        [route.line_id, route.direction]
    );
    return result.rows[0];
};

export const updateRoute = async (id: number, route: { line_id: number; direction: string }) => {
    const result = await db.query(
        "UPDATE routes SET line_id = $1, direction = $2 WHERE id = $3 RETURNING *",
        [route.line_id, route.direction, id]
    );
    return result.rows[0];
};

export const deleteRoute = async (id: number) => {
    await db.query("DELETE FROM routes WHERE id = $1", [id]);
};

export const getRoutesByLine = async (lineId: number) => {
    const result = await db.query("SELECT * FROM routes WHERE line_id = $1", [lineId]);
    return result.rows;
};

export const getRouteStops = async (routeId: number) => {
    const result = await db.query(`
        SELECT s.*, rs.stop_order 
        FROM stops s
        JOIN route_stops rs ON s.id = rs.stop_id
        WHERE rs.route_id = $1
        ORDER BY rs.stop_order
    `, [routeId]);
    return result.rows;
};

export const addStopToRoute = async (routeId: number, stopData: { stop_id: number; stop_order: number }) => {
    const result = await db.query(
        "INSERT INTO route_stops (route_id, stop_id, stop_order) VALUES ($1, $2, $3) RETURNING *",
        [routeId, stopData.stop_id, stopData.stop_order]
    );
    return result.rows[0];
};

export const removeStopFromRoute = async (routeId: number, stopId: number) => {
    await db.query("DELETE FROM route_stops WHERE route_id = $1 AND stop_id = $2", [routeId, stopId]);
};