import { ReactElement, createContext, useCallback, useEffect, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import { LOGIN, LOGOUT } from 'store/actions';
import { authReducerActionProps, initialAuthContextProps } from 'types';
import { AuthContextType } from 'types/auth';

const initialState: initialAuthContextProps = {
    isLoggedIn: false,
    isInitialized: false
};

const authReducer = (state = initialState, action: authReducerActionProps) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                isLoggedIn: action.payload!.isLoggedIn,
                isInitialized: true
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                isInitialized: true
            };
        }
        default: {
            return { ...state };
        }
    }
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(authReducer, initialState);
    const login = async (id: string, phone: string) => {
        const response = await API.post(`auth/login`, { id, phone });
        const { access_token } = response.data;

        localStorage.setItem('token', access_token);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true
            }
        });
    };

    const logout = useCallback(() => {
        dispatch({ type: LOGOUT });
        localStorage.clear();
        navigate('/login');
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: Boolean(token)
            }
        });
    }, []);

    return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('context must be use inside provider');

    return context;
};

export default AuthContext;
