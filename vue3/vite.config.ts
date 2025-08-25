import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    checker({
      vueTsc: process.env.CHECK_TS === 'true'
    })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
});
