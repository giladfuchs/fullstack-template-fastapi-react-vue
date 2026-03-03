import { createContext, useCallback, useContext, useEffect, useReducer, ReactNode } from 'react';
import type { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import API from '@/lib/utils/api';
import { authReducerActionProps, initialAuthContextProps, AuthContextType, LoginToken } from '@/lib/types';

const LOGIN = 'LOGIN' as const;
const LOGOUT = 'LOGOUT' as const;

const initialState: initialAuthContextProps = {
    isLoggedIn: false,
    isInitialized: false
};

function authReducer(state: initialAuthContextProps, action: authReducerActionProps): initialAuthContextProps {
    switch (action.type) {
        case LOGIN:
            return { ...state, isLoggedIn: action.payload!.isLoggedIn, isInitialized: true };
        case LOGOUT:
            return { ...state, isLoggedIn: false, isInitialized: true };
        default:
            return state;
    }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = useCallback(async (id: string, phone: string) => {
        const response: AxiosResponse<LoginToken> = await API.post<LoginToken>('auth/login', { id, phone });
        localStorage.setItem('token', response.data.token);
        dispatch({ type: LOGIN, payload: { isLoggedIn: true } });
    }, []);

    const logout = useCallback(() => {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        dispatch({ type: LOGIN, payload: { isLoggedIn: Boolean(token) } });
    }, []);

    return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
    return ctx;
};

export default AuthContext;
