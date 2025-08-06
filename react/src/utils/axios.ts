import axios from 'axios';
import config from '../config';

const API = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});
API.interceptors.request.use(
    (_config) => {
        const token = localStorage.getItem('token');
        if (!_config.headers) {
            _config.headers = {};
        }
        if (token) {
            _config.headers.Authorization = `Bearer ${token}`;
        }
        return _config;
    },
    (error) => Promise.reject(error)
);

export default API;
