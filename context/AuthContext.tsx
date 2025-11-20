import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    points: number;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, role?: 'user' | 'admin') => void;
    signup: (name: string, email: string) => void;
    logout: () => void;
    updatePoints: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('duo_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email: string, role: 'user' | 'admin' = 'user') => {
        // Mock login - in reality this would verify credentials
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email,
            points: role === 'admin' ? 9999 : 0, // Admins get points for testing
            role,
        };
        setUser(newUser);
        localStorage.setItem('duo_user', JSON.stringify(newUser));
    };

    const signup = (name: string, email: string) => {
        // Mock signup
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            points: 50, // Welcome bonus!
            role: 'user',
        };
        setUser(newUser);
        localStorage.setItem('duo_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('duo_user');
    };

    const updatePoints = (amount: number) => {
        if (user) {
            const updatedUser = { ...user, points: user.points + amount };
            setUser(updatedUser);
            localStorage.setItem('duo_user', JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updatePoints }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
