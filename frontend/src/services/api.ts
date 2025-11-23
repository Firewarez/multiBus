import axios from 'axios';

// Cria a instância do Axios
const getBaseUrl = () => {
    // Se estivermos rodando no computador local (localhost)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:3000/api/v1';
    }

    // Se estivermos na internet (Vercel), usa o backend do Render
    return 'https://multibus-api.onrender.com/';
};

const api = axios.create({
    baseURL: getBaseUrl(),
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