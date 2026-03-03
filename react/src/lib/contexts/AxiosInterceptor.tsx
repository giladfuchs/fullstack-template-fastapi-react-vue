import { useEffect, useContext, ReactNode } from 'react';
import { toast } from 'sonner';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import API from '@/lib/utils/api';
import AuthContext from './UseAuth';
import { useAppDispatch, setLoading } from '@/lib/store';

interface AxiosInterceptorProps {
    children: ReactNode;
}

const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
    const dispatch = useAppDispatch();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const reqId = API.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                dispatch(setLoading(true));
                return config;
            },
            (error: AxiosError) => {
                const msg = (error.response?.data as { message?: string })?.message ?? error.message ?? 'Something went wrong';
                toast.error(msg);
                dispatch(setLoading(false));
                return Promise.reject(error);
            }
        );

        const resId = API.interceptors.response.use(
            (response: AxiosResponse) => {
                dispatch(setLoading(false));
                return response;
            },
            (error: AxiosError) => {
                dispatch(setLoading(false));
                const msg = (error.response?.data as { message?: string })?.message ?? error.message ?? 'Something went wrong';
                toast.error(msg);
                if (error.response?.status === 401) {
                    authContext?.logout?.();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            API.interceptors.request.eject(reqId);
            API.interceptors.response.eject(resId);
        };
    }, [dispatch, authContext]);

    return <>{children}</>;
};

export default AxiosInterceptor;
