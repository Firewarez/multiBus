import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";

// Tipagem para a resposta do Google Directions API
interface DirectionsResponse {
    status: string;
    routes: {
        summary: string;
        legs: Array<{
            distance: { text: string; value: number };
            duration: { text: string; value: number };
            start_address: string;
            end_address: string;
            steps: Array<any>; // Pode detalhar mais se quiser
        }>;
    }[];
}

// ===============================
// Buscar rotas entre dois pontos
// ===============================
export async function getDirections(origin: string, destination: string) {
    try {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
            origin
        )}&destination=${encodeURIComponent(destination)}&key=${GOOGLE_API_KEY}`;

        const { data } = await axios.get<DirectionsResponse>(url); // ✅ tipagem aqui

        if (!data || data.status !== "OK") {
            throw new Error(`Erro da API Google: ${data?.status || "sem resposta"}`);
        }

        return data.routes[0];
    } catch (error: any) {
        console.error("Erro ao buscar direções:", error.message);
        throw error;
    }
}

// ===============================
// Buscar coordenadas de um endereço
// ===============================
interface GeocodeResponse {
    results: Array<{
        geometry: { location: { lat: number; lng: number } };
    }>;
    status: string;
}

export async function getCoordinates(address: string) {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${GOOGLE_API_KEY}`;

        const { data } = await axios.get<GeocodeResponse>(url);

        if (!data.results || data.results.length === 0) {
            throw new Error("Endereço não encontrado.");
        }

        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
    } catch (error: any) {
        console.error("Erro ao buscar coordenadas:", error.message);
        throw error;
    }
}