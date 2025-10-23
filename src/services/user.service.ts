import axios from "axios";

const API_URL = 'http://localhost:3000/user/user';

interface userData {
    id: string;
}

export const userService = async (data: userData) => {
    try {
        const response = await axios.post(API_URL, data)
        return response.data
    } catch (error: any) {
        if(error.response) {
            throw new Error(error.response?.data.message || 'Erro ao buscar usuário ') 
        } else {
            throw new Error('Erro de conexão com o servidor');
        }
    }
}