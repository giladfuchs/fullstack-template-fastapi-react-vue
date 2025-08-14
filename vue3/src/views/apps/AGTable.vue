<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {useRoute} from 'vue-router';

import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import AGTableHeader from '@/views/components/table/ag_table/AGTableHeader.vue';
import AGTableBase from '@/views/components/table/ag_table/AGTableBase.vue';

import {get_columns_ag_by_model, type AGTableModelType, ModelType} from '@/common/types';
import {useGeneralStore} from '@/common/stores/general';
import type {ColDef} from 'ag-grid-community';

const store = useGeneralStore();
const route = useRoute();

const ref_base_table = ref(null);
const ref_header_table = ref(null);

const model = computed<ModelType>(() => route.params.model as ModelType);
const columns = computed<ColDef[]>(() => get_columns_ag_by_model(model.value));
const rows = computed<AGTableModelType[]>(() => store.list[model.value] || []);

const itemsSearching = computed(() => {
  const temp_search_value = ref_header_table.value?.search_value?.toString() ?? '';
  if (temp_search_value !== '') {
    const regex = new RegExp(temp_search_value, 'i');
    const filtered = rows.value.filter((item: AGTableModelType) => regex.test(Object.values(item).join(' ').toLowerCase()));
    return filtered.length > 0 ? filtered : [{}];
  }
  return rows.value;
});

const init = async () => {
  if (model.value) {
    await store.fetch_rows(model.value, {relation_model: true});
  }
};

onMounted(init);
watch(model, init);
</script>

<template>
  <v-row style="height: 50rem" v-if="model && rows">
    <v-col cols="12">
      <UiParentCard>
        <AGTableHeader ref="ref_header_table" v-bind="{ child: ref_base_table, model, columns }"/>
        <AGTableBase ref="ref_base_table" v-bind="{ columns, rows: itemsSearching }"/>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
