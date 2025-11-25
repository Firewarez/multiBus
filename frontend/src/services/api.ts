import axios from 'axios';

// Cria a instância do Axios
const getBaseUrl = () => {
    // Se estivermos rodando no computador local (localhost)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:3000/api/v1';
    }

    // Se estivermos na internet (Vercel), usa o backend do Render
    return 'https://multibus-api.onrender.com/api/v1';
};

const api = axios.create({
    baseURL: getBaseUrl(),
});

// Funções para buscar dados
export const getLinhasAPI = async () => {
    const response = await api.get('/lines');
    return response.data;
};

export const getParadasAPI = async () => {
    const response = await api.get('/stops');
    return response.data;
};

export const getRotasAPI = async () => {
    const response = await api.get('/routes');
    return response.data;
};

export const getRotaByIdAPI = async (id: number) => {
    const response = await api.get(`/routes/${id}`);
    return response.data;
};

export const getRotasByLinhaAPI = async (lineId: number) => {
    const response = await api.get(`/routes/line/${lineId}`);
    return response.data;
};

export const getStopsByRotaAPI = async (routeId: number) => {
    const response = await api.get(`/routes/${routeId}/stops`);
    return response.data;
};

// Funções para notificações
export const getNotificacoesAtivasAPI = async () => {
    const response = await api.get('/notifications/active');
    return response.data;
};

export const getAllNotificacoesAPI = async () => {
    const response = await api.get('/notifications');
    return response.data;
};

// Funções para autenticação e usuários
export const loginAPI = async (email: string, senha: string) => {
    const response = await api.post('/users/login', { email, senha });
    return response.data;
};

export const registerAPI = async (userData: {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    senha: string;
    nascimento: string;
}) => {
    const response = await api.post('/users', userData);
    return response.data;
};

export const getUserByIdAPI = async (userId: number) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

export const updateUserAPI = async (userId: number, userData: any) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
};

export default api;