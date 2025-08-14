<script setup lang="ts">
import { ICellRendererParams } from 'ag-grid-community';

import AssignmentsHover from '@/views/components/general/AssignmentsHover.vue';

const props = defineProps<{
  params: ICellRendererParams;
}>();
</script>

<template>
  <v-menu open-on-hover offset-y>
    <template v-slot:activator="{ props }">
      <v-btn size="small" color="primary" v-bind="props">Hover me</v-btn>
    </template>

    <v-card>
      <AssignmentsHover :assignments="props.params.value" />
    </v-card>
  </v-menu>
</template>
