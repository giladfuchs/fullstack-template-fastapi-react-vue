import { defineStore } from 'pinia';
import { router } from '@/common/router';
import API from '@/common/api';
import { LoginToken, Teacher } from '@/common/types';
import type { AxiosResponse } from 'axios';

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    user_id: 0,
    student_id: 0,
    authenticated: false
  }),

  actions: {
    async login(data: Teacher) {
      const response: AxiosResponse<LoginToken> = await API.post<LoginToken>(`auth/login`, data);

      const res_data = response.data;
      this.authenticated = true;
      this.user_id = res_data.id;
      localStorage.setItem('token', res_data.token);

      await router.push('/student');
    },

    async logout() {
      this.authenticated = false;
      localStorage.removeItem('token');
      await router.push('/login');
    }
  }
});
