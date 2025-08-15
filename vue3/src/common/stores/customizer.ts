import { defineStore } from 'pinia';
import config from '@/common/config';

export const useCustomizerStore = defineStore({
  id: 'customizer',
  persist: true,
  state: () => ({
    mini_sidebar: config.mini_sidebar,
    actTheme: config.actTheme,
    fontTheme: config.fontTheme,
    boxed: config.boxed,
    loading: false
  }),

  getters: {}
});
