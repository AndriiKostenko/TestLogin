import axios from 'axios';
import { User } from '../types';

const fetchUser = async (token: string): Promise<User> => {
    try {
        const response = await axios.get('https://dummyjson.com/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
};

export const userService = {
    fetchUser,
};
