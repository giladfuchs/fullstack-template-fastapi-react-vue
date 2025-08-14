<script setup lang="ts">
import { ref, watch } from 'vue';
import { SettingsIcon } from 'vue-tabler-icons';
import { useCustomizerStore } from '@/common/stores/customizer';

import ProfileDD from '@/assets/layouts/full/vertical-header/ProfileDD.vue';

const customizer = useCustomizerStore();
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);

watch(priority, (newPriority) => {
  priority.value = newPriority;
});
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="80">
    <v-btn variant="flat" color="primary" class="mt-4" to="/student" prepend-icon="mdi-home"> Home</v-btn>

    <v-spacer />

    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
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
