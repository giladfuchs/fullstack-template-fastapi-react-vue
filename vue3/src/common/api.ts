import axios, { type AxiosResponse } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    suppressToast?: boolean;
  }
}
import config from '@/common/config';

import { useCustomizerStore } from '@/common/stores/customizer';
import { useAuthStore } from '@/common/stores/auth';
import { useToast } from 'vue-toastification';
import { FormModelType, ModelType } from '@/common/types';

const toast = useToast();

const API = axios.create({
  baseURL: config.apiUrl,
  withCredentials: false,
  headers: {
    'content-Type': 'application/json',
    'Access-Control-Expose-Headers': 'Access-Token'
  }
});
API.interceptors.request.use(
  (config) => {
    const customizer = useCustomizerStore();
    customizer.loading = true;

    const token = localStorage.getItem('token');
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    const customizer = useCustomizerStore();
    customizer.loading = false;

    return response;
  },
  async (error) => {
    console.log('error', error.response);
    const customizer = useCustomizerStore();

    customizer.loading = false;
    const config = error.config as { suppressToast?: boolean };
    const message = error?.response?.data?.message || error?.response?.data || 'Unknown error';

    if (!config?.suppressToast && typeof message === 'string') {
      toast.error(message);
    }
    if (error.response.status === 401) {
      await useAuthStore().logout();
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

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

export const deleteRowById = async (opts: { model: ModelType; id: number | string; message: string }) => {
  const { model, id, message } = opts;
  const data = { query: [{ key: 'id', value: typeof id === 'string' ? Number(id) : id, opt: 'eq' }] };
  await API.delete(`/${model}`, { data });
  toast.success(message);
};

export default API;
