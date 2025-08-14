import { defineStore } from 'pinia';
import config from '@/common/config';

export const useCustomizerStore = defineStore({
  id: 'customizer',
  persist: {
    enabled: true
  },
  state: () => ({
    mini_sidebar: config.mini_sidebar,
    setHorizontalLayout: config.setHorizontalLayout,
    actTheme: config.actTheme,
    fontTheme: config.fontTheme,
    inputBg: config.inputBg,
    boxed: config.boxed,
    loading: false
  }),

  getters: {},

});
