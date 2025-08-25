<script setup lang="ts">
import type { Assignment } from '@/common/types';

defineProps<{ assignments: Assignment[] }>();
</script>

<template>
  <v-timeline truncate-line="both" side="end" class="my-3">
    <v-timeline-item v-for="assignment in assignments" :key="assignment.id" size="large" :value="assignment">
      <v-card elevation="0" rounded="0">
        <span class="text-subtitle-2 text-medium-emphasis">{{ assignment.title }}</span>
        <h5 class="text-subtitle-1 font-weight-regular text-wrap pr-3">
          {{ assignment.detail }}
        </h5>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
