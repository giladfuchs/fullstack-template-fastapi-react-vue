import config from '@/common/config';

import axios from 'axios';
import { useCustomizerStore } from '@/common/stores/customizer';
import { useAuthStore } from '@/common/stores/auth';
import { useToast } from 'vue-toastification';

const toast = useToast();

const axiosServices = axios.create({
  baseURL: config.apiUrl,
  withCredentials: false,
  headers: {
    'content-Type': 'application/json',
    'Access-Control-Expose-Headers': 'Access-Token'
  }
});
axiosServices.interceptors.request.use(
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

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => {
    const customizer = useCustomizerStore();
    customizer.loading = false;

    return response;
  },
  async (error) => {
    console.log('error', error.response);
    const customizer = useCustomizerStore();

    customizer.loading = false;
    const message = error?.response?.data?.message || error?.response?.data || 'Unknown error';
    toast.error(message);
    if (error.response.status === 401) {
      await useAuthStore().logout();
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;
