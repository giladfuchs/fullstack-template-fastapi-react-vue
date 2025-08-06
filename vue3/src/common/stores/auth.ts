import { defineStore } from 'pinia';
import { router } from '@/common/router';
import axios from '@/common/axios';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user_id: 0,
    student_id: 0,
    authenticated: false
  }),
  persist: {
    enabled: true
  },

  actions: {
    async login(data: any = {}) {
      try {
        const response = await axios.post(`auth/login`, data);
        const res_data = response.data;
        this.authenticated = true;
        this.user_id = res_data.id;
        localStorage.setItem('token', res_data.access_token);

        await router.push('/student');
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async logout() {
      this.authenticated = false;
      localStorage.removeItem('token');
      await router.push('/login');
    }
  }
});
