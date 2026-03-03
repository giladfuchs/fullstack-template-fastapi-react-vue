<script setup lang="ts">
import type { ICellRendererParams } from 'ag-grid-community';
import AssignmentsHover from '@/views/components/general/AssignmentsHover.vue';

defineProps<{ params: ICellRendererParams }>();
</script>

<template>
  <v-menu open-on-hover offset-y>
    <template #activator="{ props: activatorProps }">
      <v-btn size="small" color="primary" v-bind="activatorProps">{{ $t('hover_me') }}</v-btn>
    </template>

    <v-card>
      <AssignmentsHover :assignments="params.value" />
    </v-card>
  </v-menu>
</template>
