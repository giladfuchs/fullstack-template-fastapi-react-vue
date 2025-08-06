import { defineStore } from 'pinia';
import config from '@/common/config';

export const useCustomizerStore = defineStore({
  id: 'customizer',
  state: () => ({
    Sidebar_drawer: config.Sidebar_drawer,
    Customizer_drawer: config.Customizer_drawer,
    mini_sidebar: config.mini_sidebar,
    setHorizontalLayout: config.setHorizontalLayout,
    actTheme: config.actTheme,
    fontTheme: config.fontTheme,
    inputBg: config.inputBg,
    boxed: config.boxed,
    loading: false
  }),

  getters: {},
  actions: {
    SET_CUSTOMIZER_DRAWER(payload: any) {
      this.Customizer_drawer = payload;
    }
  }
});
