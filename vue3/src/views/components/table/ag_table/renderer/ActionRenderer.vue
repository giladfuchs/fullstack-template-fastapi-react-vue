<script setup lang="ts">
import type { ICellRendererParams } from 'ag-grid-community';
import { ModelType } from '@/common/types';

defineProps<{ params: ICellRendererParams }>();
</script>

<template>
  <v-btn
    icon
    variant="flat"
    size="x-small"
    rounded="md"
    class="text-secondary"
    color="lightsecondary"
    :to="`/${ModelType.student}/view/${params.value}`"
  >
    <EyeIcon size="22" />
  </v-btn>
</template>
