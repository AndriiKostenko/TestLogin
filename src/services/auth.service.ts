import axios from 'axios';
import { LoginResponse } from '../types';

const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post('https://dummyjson.com/auth/login', {
            username,
            password,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

export const authService = {
    login,
};
