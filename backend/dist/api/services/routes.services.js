"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStopFromRoute = exports.addStopToRoute = exports.getRouteStops = exports.getRoutesByLine = exports.deleteRoute = exports.updateRoute = exports.createRoute = exports.getRouteById = exports.getAllRoutes = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getAllRoutes = async () => {
    const result = await db_1.default.query(`
        SELECT r.*, l.code as line_code, l.name as line_name 
        FROM routes r
        JOIN lines l ON r.line_id = l.id
        ORDER BY l.code, r.direction
    `);
    return result.rows;
};
exports.getAllRoutes = getAllRoutes;
const getRouteById = async (id) => {
    const result = await db_1.default.query(`
        SELECT r.*, l.code as line_code, l.name as line_name 
        FROM routes r
        JOIN lines l ON r.line_id = l.id
        WHERE r.id = $1
    `, [id]);
    return result.rows[0];
};
exports.getRouteById = getRouteById;
const createRoute = async (route) => {
    const result = await db_1.default.query("INSERT INTO routes (line_id, direction) VALUES ($1, $2) RETURNING *", [route.line_id, route.direction]);
    return result.rows[0];
};
exports.createRoute = createRoute;
const updateRoute = async (id, route) => {
    const result = await db_1.default.query("UPDATE routes SET line_id = $1, direction = $2 WHERE id = $3 RETURNING *", [route.line_id, route.direction, id]);
    return result.rows[0];
};
exports.updateRoute = updateRoute;
const deleteRoute = async (id) => {
    await db_1.default.query("DELETE FROM routes WHERE id = $1", [id]);
};
exports.deleteRoute = deleteRoute;
const getRoutesByLine = async (lineId) => {
    const result = await db_1.default.query("SELECT * FROM routes WHERE line_id = $1", [lineId]);
    return result.rows;
};
exports.getRoutesByLine = getRoutesByLine;
const getRouteStops = async (routeId) => {
    const result = await db_1.default.query(`
        SELECT s.*, rs.stop_order 
        FROM stops s
        JOIN route_stops rs ON s.id = rs.stop_id
        WHERE rs.route_id = $1
        ORDER BY rs.stop_order
    `, [routeId]);
    return result.rows;
};
exports.getRouteStops = getRouteStops;
const addStopToRoute = async (routeId, stopData) => {
    const result = await db_1.default.query("INSERT INTO route_stops (route_id, stop_id, stop_order) VALUES ($1, $2, $3) RETURNING *", [routeId, stopData.stop_id, stopData.stop_order]);
    return result.rows[0];
};
exports.addStopToRoute = addStopToRoute;
const removeStopFromRoute = async (routeId, stopId) => {
    await db_1.default.query("DELETE FROM route_stops WHERE route_id = $1 AND stop_id = $2", [routeId, stopId]);
};
exports.removeStopFromRoute = removeStopFromRoute;
//# sourceMappingURL=routes.services.js.map