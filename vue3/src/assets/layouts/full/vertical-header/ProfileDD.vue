<script setup lang="ts">
import { SettingsIcon, LogoutIcon, UserIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/common/stores/auth';
import { useCustomizerStore } from '@/common/stores/customizer';
import Customizer from "@/assets/layouts/full/customizer/Customizer.vue";

const authStore = useAuthStore();
const customizer = useCustomizerStore();
</script>

<template>
  <div class="pa-4">
    <span class="text-subtitle-2 text-medium-emphasis">Vue Full Stack Template</span>

    <v-divider></v-divider>
    <perfect-scrollbar style=" max-height: 303rem">
      <v-list class="mt-3 bg-lightwarning rounded-md pa-5 my-3 circle sm-circle lg-circle">


        <v-list-item @click="authStore.logout()" active-color="secondary" rounded="md">
          <template v-slot:prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Logout</v-list-item-title>
        </v-list-item>

      </v-list>
      <v-card-title class="d-flex align-center">
        <SettingsIcon size="20" class="mr-2" />
        <span class="text-h6">Theme Settings</span>
      </v-card-title>
          <Customizer />
    </perfect-scrollbar>
  </div>
</template>
