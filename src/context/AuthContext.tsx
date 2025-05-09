import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { LoginResponse } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
    user: LoginResponse | null;
    login: (userData: LoginResponse) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<LoginResponse | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const loadToken = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };

        loadToken();
    }, []);

    const login = async (userData: LoginResponse) => {
        setUser(userData);
        setIsLoggedIn(true);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        setUser(null);
        setIsLoggedIn(false);
        await AsyncStorage.removeItem('user');
    };

    const value: AuthContextProps = {
        user,
        login,
        logout,
        isLoggedIn,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
