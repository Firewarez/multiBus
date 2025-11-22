import axios from 'axios';

// Cria a instância do Axios
const api = axios.create({
    // Aqui apontamos para a porta 3000 e incluímos o /api/v1 que está no server.ts
    baseURL: 'http://localhost:3000/api/v1',
});

// Funções para buscar dados
export const getLinhasAPI = async () => {
    // Como a baseURL já tem /api/v1, aqui chamamos apenas /lines
    const response = await api.get('/lines');
    return response.data;
};

export const getParadasAPI = async () => {
    const response = await api.get('/stops');
    return response.data;
};

export default api;