import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import config from '../config';

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

export default API;
