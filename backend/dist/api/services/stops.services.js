"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStop = exports.updateStop = exports.createStop = exports.getStopById = exports.getAllStops = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getAllStops = async () => {
    const result = await db_1.default.query("SELECT * FROM stops ORDER BY id");
    return result.rows;
};
exports.getAllStops = getAllStops;
const getStopById = async (id) => {
    const result = await db_1.default.query("SELECT * FROM stops WHERE id = $1", [id]);
    return result.rows[0];
};
exports.getStopById = getStopById;
const createStop = async (stop) => {
    const result = await db_1.default.query("INSERT INTO stops (name, latitude, longitude) VALUES ($1, $2, $3) RETURNING *", [stop.name, stop.latitude, stop.longitude]);
    return result.rows[0];
};
exports.createStop = createStop;
const updateStop = async (id, stop) => {
    const result = await db_1.default.query("UPDATE stops SET name = $1, latitude = $2, longitude = $3 WHERE id = $4 RETURNING *", [stop.name, stop.latitude, stop.longitude, id]);
    return result.rows[0];
};
exports.updateStop = updateStop;
const deleteStop = async (id) => {
    await db_1.default.query("DELETE FROM stops WHERE id = $1", [id]);
};
exports.deleteStop = deleteStop;
//# sourceMappingURL=stops.services.js.map