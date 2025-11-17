<script setup lang="ts">
import { SettingsIcon } from 'vue-tabler-icons';
import ProfileDD from '@/assets/layouts/full/vertical-header/ProfileDD.vue';
</script>

<template>
  <v-app-bar elevation="0" priority="0" height="80">
    <v-btn variant="flat" color="primary" class="mt-4" to="/student" prepend-icon="mdi-home"> {{ $t('home') }}</v-btn>

    <v-spacer />

    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <v-btn class="profileBtn text-primary" color="lightprimary" variant="flat" rounded="pill" v-bind="props">
          <SettingsIcon stroke-width="1.5" />
        </v-btn>
      </template>
      <v-sheet rounded="md" width="330" elevation="12">
        <ProfileDD />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>
