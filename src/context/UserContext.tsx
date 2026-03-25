import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../services/api';

interface UserProfile {
    _id?: string;
    name: string;
    email: string;
    notifications: {
        email: boolean;
        push: boolean;
        updates: boolean;
    };
    theme: 'dark' | 'light' | 'system';
    token?: string;
}

interface UserContextType {
    user: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: any) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    updateUser: (updates: Partial<UserProfile>) => Promise<void>;
    toggleNotification: (key: keyof UserProfile['notifications']) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const savedUser = localStorage.getItem('studyvault_user');
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);

                // Optional: Validate token with backend
                // try {
                //     const { data } = await api.get('/auth/me');
                //     setUser({ ...parsedUser, ...data });
                // } catch (error) {
                //     localStorage.removeItem('studyvault_user');
                //     setUser(null);
                // }
            }
            setIsLoading(false);
        };
        checkLoggedIn();
    }, []);

    useEffect(() => {
        // Default to dark mode (isDark = true)
        let isDark = true;

        if (user) {
            if (user.theme === 'light') {
                isDark = false;
            } else if (user.theme === 'system') {
                isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            } else {
                // Default or 'dark'
                isDark = true;
            }
        } else {
            // No user logged in, force dark mode
            isDark = true;
        }

        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [user]);

    const login = async (credentials: any) => {
        const { data } = await api.post('/auth/login', credentials);
        setUser(data);
        localStorage.setItem('studyvault_user', JSON.stringify(data));
        localStorage.setItem('user', JSON.stringify(data)); // For API interceptor
    };

    const register = async (userData: any) => {
        const { data } = await api.post('/auth/register', userData);
        setUser(data);
        localStorage.setItem('studyvault_user', JSON.stringify(data));
        localStorage.setItem('user', JSON.stringify(data)); // For API interceptor
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('studyvault_user');
        localStorage.removeItem('user');
        // Let useEffect handle default theme (dark)
    };

    const updateUser = async (updates: Partial<UserProfile>) => {
        try {
            const { data } = await api.put('/auth/profile', updates);
            // Merge with existing user to keep token
            const updatedUser = { ...user, ...data, token: user?.token };
            setUser(updatedUser);
            localStorage.setItem('studyvault_user', JSON.stringify(updatedUser));
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Failed to update profile', error);
            throw error;
        }
    };

    const toggleNotification = async (key: keyof UserProfile['notifications']) => {
        if (!user) return;

        const newNotifications = {
            ...user.notifications,
            [key]: !user.notifications[key]
        };

        await updateUser({ notifications: newNotifications });
    };

    return (
        <UserContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            register,
            logout,
            updateUser,
            toggleNotification
        }}>
            {children}
        </UserContext.Provider>
    );
};
