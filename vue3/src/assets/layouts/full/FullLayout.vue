<script setup lang="ts">
import { RouterView } from 'vue-router';
import VerticalHeaderVue from '@/assets/layouts/full/vertical-header/VerticalHeader.vue';
import { useCustomizerStore } from '@/common/stores/customizer';
import { useAuthStore } from '@/common/stores/auth';

const customizer = useCustomizerStore();
const auth_store = useAuthStore();
</script>

<template>
  <v-locale-provider :rtl="customizer.isRtl">
    <v-app :theme="customizer.actTheme" :class="[customizer.actTheme, customizer.fontTheme]" :dir="customizer.isRtl ? 'rtl' : 'ltr'">
      <VerticalHeaderVue v-if="auth_store.authenticated" />

      <v-main>
        <v-progress-linear
          v-if="customizer.loading"
          style="z-index: 124; top: 4.9rem; height: 0.4rem; width: 100%; position: fixed"
          color="primary"
          indeterminate
        />
        <v-container fluid class="page-wrapper">
          <RouterView />
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
