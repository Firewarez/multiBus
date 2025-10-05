"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirections = getDirections;
exports.getCoordinates = getCoordinates;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";
// ===============================
// Buscar rotas entre dois pontos
// ===============================
async function getDirections(origin, destination) {
    try {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${GOOGLE_API_KEY}`;
        const { data } = await axios_1.default.get(url); // ✅ tipagem aqui
        if (!data || data.status !== "OK") {
            throw new Error(`Erro da API Google: ${data?.status || "sem resposta"}`);
        }
        return data.routes[0];
    }
    catch (error) {
        console.error("Erro ao buscar direções:", error.message);
        throw error;
    }
}
async function getCoordinates(address) {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
        const { data } = await axios_1.default.get(url);
        if (!data.results || data.results.length === 0) {
            throw new Error("Endereço não encontrado.");
        }
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
    }
    catch (error) {
        console.error("Erro ao buscar coordenadas:", error.message);
        throw error;
    }
}
//# sourceMappingURL=googleApi.services.js.map