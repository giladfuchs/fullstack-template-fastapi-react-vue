<script setup lang="ts">
import { ICellRendererParams } from 'ag-grid-community';

const props = defineProps<{
  params: ICellRendererParams;
}>();
</script>
<template>
  <v-btn
    icon
    variant="flat"
    size="small"
    rounded="md"
    class="text-secondary"
    color="lightsecondary"
    :to="`/student/view/${props.params.value}`"
  >
    <EyeIcon size="18" />
  </v-btn>
</template>
