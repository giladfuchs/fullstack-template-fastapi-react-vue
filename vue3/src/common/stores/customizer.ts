import { defineStore } from 'pinia';
import config from '@/common/config';

export const useCustomizerStore = defineStore('customizer', {
  persist: true,
  state: () => ({
    actTheme: config.actTheme,
    fontTheme: config.fontTheme,
    isRtl: config.isRtl,
    loading: false
  }),
  getters: {}
});
