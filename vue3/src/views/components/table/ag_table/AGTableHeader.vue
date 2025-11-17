<script setup lang="ts">
import { computed, ref } from 'vue';
import { ModelType } from '@/common/types';

interface Props {
  child: { exportDataAsCsv: (fileName: string) => void } | null;
  model: ModelType;
}
const { child, model } = defineProps<Props>();

const fileName = computed(
  () => `${model}-${new Date().toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: '2-digit' })}.csv`
);

const exportDataAsCsv = () => child?.exportDataAsCsv(fileName.value);

const search_value = ref('');
defineExpose({
  search_value
});
</script>

<template>
  <v-row justify="space-between" class="align-center mb-1">
    <v-col cols="12" md="4" class="d-flex gap-1 justify-start flex-column flex-sm-row">
      <v-card-title class="text-h2 text-center font-weight-medium">{{ $t(`${model}_table`) }}</v-card-title>
    </v-col>
    <v-col cols="8" sm="6" md="3">
      <v-text-field
        v-model="search_value"
        type="text"
        variant="outlined"
        :placeholder="$t('search')"
        density="compact"
        hide-details
        prepend-inner-icon="mdi-magnify"
      />
    </v-col>

    <v-col cols="4" sm="3" md="3">
      <div class="d-flex gap-2 justify-end">
        <v-btn icon color="secondary" variant="text" @click="exportDataAsCsv">
          <PrinterIcon size="20" />
        </v-btn>
        <v-btn :href="`${model}/add`" rounded="md" icon color="secondary" variant="text">
          <ClipboardPlusIcon size="20" />
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
