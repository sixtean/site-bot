import axios from 'axios';

const API_URL = 'http://localhost:3000/login/';

interface LoginData {
    id: string;
    password: string;
}

export const loginService = async (data: LoginData) => {
    try {
        const response = await axios.post(API_URL, data)
        return response.data
    } catch (error: any) {
        if(error.response) {
            throw new Error(error.response?.data.message || 'Erro ao fazer login') 
        } else {
            throw new Error('Erro de conexão com o servidor');
        }
    }
}