import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { inject } from '@vercel/analytics';
import 'vuetify/styles';

import App from './views/components/App.vue';
import { router } from './common/router';
import vuetify from './assets/layouts/plugins/vuetify';
import '@/assets/layouts/scss/style.scss';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import VueTablerIcons from 'vue-tabler-icons';
import Toast from 'vue-toastification';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import Vue3EasyDataTable from 'vue3-easy-data-table';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

import { createI18n } from 'vue-i18n';
import messages from '@/assets/locales/messages';

const i18n = createI18n({
  locale: 'en',
  legacy: false,
  messages: messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('PerfectScrollbar', PerfectScrollbar);
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
inject();
