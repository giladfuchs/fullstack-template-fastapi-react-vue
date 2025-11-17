<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { SettingsIcon, LogoutIcon, ChevronDownIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/common/stores/auth';
import Customizer from '@/assets/layouts/full/customizer/Customizer.vue';


const authStore = useAuthStore();

const { locale } = useI18n();

const openLanguage = ref(false);
const languages = [
  { lng: 'en', labelKey: 'english' },
  { lng: 'es', labelKey: 'spanish' },
  { lng: 'fr', labelKey: 'french' },
  { lng: 'he', labelKey: 'hebrew' },
  { lng: 'hi', labelKey: 'hindi' }
];

const setLocale = (lng: string) => {
  locale.value = lng;
  localStorage.setItem('locale', lng);
  openLanguage.value = false;
};
</script>

<template>
  <div class="pa-4">
    <span class="text-subtitle-2 text-medium-emphasis">{{ $t('full_stack_template') }}</span>

    <v-divider />
    <div class="scroll-area">
      <v-list class="mt-3">
        <v-list-item color="secondary" rounded="md" @click="authStore.logout()">
          <template #prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>
          <v-list-item-title class="text-subtitle-2">{{ $t('logout') }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list class="mb-6">
        <v-list-group v-model="openLanguage" no-action>
          <template #activator="{ props }">
            <v-list-item v-bind="props" rounded="md">
              <template #prepend>
                <ChevronDownIcon size="22" class="mr-2" />
              </template>
              <v-list-item-title class="text-subtitle-2">{{ $t('language') }}</v-list-item-title>

              <template #append>
                <span class="text-caption">{{ locale.toUpperCase() }}</span>
              </template>
            </v-list-item>
          </template>

          <v-list-item
            v-for="item in languages"
            :key="item.lng"
            rounded="md"
            class="pl-9"
            :active="locale === item.lng"
            @click="setLocale(item.lng)"
          >
            <v-list-item-title class="text-body-2">{{ $t(item.labelKey) }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-card-title class="d-flex align-center">
        <SettingsIcon size="20" class="mr-2" />
        <span class="text-h6">{{ $t('theme_settings') }}</span>
      </v-card-title>
      <Customizer />
    </div>
  </div>
</template>
