<script setup lang="ts">
import { SettingsIcon, LogoutIcon, UserIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/common/stores/auth';
import { useCustomizerStore } from '@/common/stores/customizer';

const authStore = useAuthStore();
const customizer = useCustomizerStore();
</script>

<template>
  <div class="pa-4">
    <span class="text-subtitle-2 text-medium-emphasis">Vue Full Stack Template</span>

    <v-divider></v-divider>
    <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 515px">
      <v-list class="mt-3 bg-lightwarning rounded-md pa-5 my-3 circle sm-circle lg-circle">
        <v-list-item @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)" active-color="secondary" rounded="md">
          <template v-slot:prepend>
            <SettingsIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Theme Settings</v-list-item-title>
        </v-list-item>

        <v-list-item @click="authStore.logout()" active-color="secondary" rounded="md">
          <template v-slot:prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
</template>
