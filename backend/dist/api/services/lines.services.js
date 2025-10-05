"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLine = exports.updateLine = exports.createLine = exports.getLineById = exports.getAllLines = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getAllLines = async () => {
    const result = await db_1.default.query("SELECT * FROM lines ORDER BY id");
    return result.rows;
};
exports.getAllLines = getAllLines;
const getLineById = async (id) => {
    const result = await db_1.default.query("SELECT * FROM lines WHERE id = $1", [id]);
    return result.rows[0];
};
exports.getLineById = getLineById;
const createLine = async (line) => {
    const result = await db_1.default.query("INSERT INTO lines (code, name) VALUES ($1, $2) RETURNING *", [line.code, line.name]);
    return result.rows[0];
};
exports.createLine = createLine;
const updateLine = async (id, line) => {
    const result = await db_1.default.query("UPDATE lines SET code = $1, name = $2 WHERE id = $3 RETURNING *", [line.code, line.name, id]);
    return result.rows[0];
};
exports.updateLine = updateLine;
const deleteLine = async (id) => {
    await db_1.default.query("DELETE FROM lines WHERE id = $1", [id]);
};
exports.deleteLine = deleteLine;
//# sourceMappingURL=lines.services.js.map