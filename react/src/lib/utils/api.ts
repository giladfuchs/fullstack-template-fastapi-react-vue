import axios, { AxiosHeaders, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { FieldValue, ModelType, FormModelType } from '@/lib/types';
import config from './config';

const API = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

API.interceptors.request.use(
    (cfg: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        cfg.headers = cfg.headers ?? new AxiosHeaders();
        if (token) {
            cfg.headers.set('Authorization', `Bearer ${token}`);
        }
        return cfg;
    },
    (error) => Promise.reject(error)
);

export const createOrUpdateRow = async (opts: {
    model: ModelType;
    id: number | string;
    data: Record<string, FieldValue>;
    message: string;
}) => {
    const { model, id, data, message } = opts;
    await API.post(`/${model}/${id}`, data);
    toast.success(message);
};

export const deleteRowById = async (opts: { model: ModelType; id: number | string; message: string }) => {
    const { model, id, message } = opts;
    const data = { query: [{ key: 'id', value: id, opt: 'eq' }] };
    await API.delete(`/${model}`, { data });
    toast.success(message);
};

export const fetchRowById = async (opts: { model: ModelType; id: number | string; relation?: boolean }): Promise<FormModelType> => {
    const { model, id, relation } = opts;
    const res: AxiosResponse<FormModelType> = await API.post<FormModelType>(
        `/${model}`,
        {
            query: [{ key: 'id', value: typeof id === 'string' ? Number(id) : id, opt: 'eq' }],
            ...(relation ? { relation_model: true } : {})
        },
        { params: { limit: 1 } }
    );
    return res.data;
};
export default API;
