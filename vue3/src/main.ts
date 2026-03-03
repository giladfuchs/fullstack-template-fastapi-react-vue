import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import VueTablerIcons from 'vue-tabler-icons';
import Toast from 'vue-toastification';
// @ts-ignore – vue3-easy-data-table has no proper default export types
import Vue3EasyDataTable from 'vue3-easy-data-table';

import 'vuetify/styles';
import vuetify from './assets/layouts/plugins/vuetify';
import '@/assets/layouts/scss/style.scss';

import messages from '@/assets/locales/messages';
import App from './views/components/App.vue';
import { router } from './common/router';

ModuleRegistry.registerModules([AllCommunityModule]);

const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'en',
  legacy: false,
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(pinia);
app.use(VueTablerIcons);
app.use(Toast, {
  position: 'bottom-center',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false
});
app.use(i18n);
app.use(vuetify).mount('#app');

if (typeof window !== 'undefined' && window.location.hostname.endsWith('.vercel.app')) {
  void import('@vercel/analytics').then(({ inject }) => inject());
}
