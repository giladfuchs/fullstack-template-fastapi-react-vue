<script setup lang="ts">
import { ref } from 'vue';

import 'vue3-easy-data-table/dist/style.css';

import { ModelType } from '@/common/types';

interface Props {
  child: any;
  model: ModelType;
}

const props = defineProps<Props>();

const exportDataAsCsv = () => {
  props.child.exportDataAsCsv();
};

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
        type="text"
        variant="outlined"
        placeholder="Search"
        v-model="search_value"
        density="compact"
        hide-details
        prepend-inner-icon="mdi-magnify"
      />
    </v-col>

    <v-col cols="4" sm="3" md="3">
      <div class="d-flex gap-2 justify-end">
        <v-btn @click="exportDataAsCsv" icon color="secondary" variant="text">
          <PrinterIcon size="20" />
        </v-btn>
        <v-btn :href="`${model}/add`" rounded="md" icon color="secondary" variant="text">
          <ClipboardPlusIcon size="20" />
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
