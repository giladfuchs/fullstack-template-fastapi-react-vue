import { useDispatch } from 'react-redux';
import { useEffect, useContext, ReactNode } from 'react';
import { toast } from 'sonner';
import API from '../utils/axios';
import { setLoading } from 'store/generalSlice';
import AuthContext from './UseAuth';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface AxiosInterceptorProps {
    children: ReactNode;
}

const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
    const dispatch = useDispatch();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = API.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                dispatch(setLoading(true));
                return config;
            },
            (error: AxiosError) => {
                toast.error(error.response?.data?.message || error.message || 'Something went wrong');
                dispatch(setLoading(false));
                return Promise.reject(error);
            }
        );

        const responseInterceptor = API.interceptors.response.use(
            (response: AxiosResponse) => {
                dispatch(setLoading(false));
                return response;
            },
            (error: AxiosError) => {
                dispatch(setLoading(false));
                toast.error(error.response?.data?.message || error.message || 'Something went wrong');
                if (error.response?.status === 401) {
                    authContext!.logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            API.interceptors.request.eject(requestInterceptor);
            API.interceptors.response.eject(responseInterceptor);
        };
    }, [dispatch, authContext]);

    return <>{children}</>;
};

export default AxiosInterceptor;
