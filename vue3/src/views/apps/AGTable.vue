<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import AGTableHeader from '@/views/components/table/ag_table/AGTableHeader.vue';
import AGTableBase from '@/views/components/table/ag_table/AGTableRenderer.vue';
import { get_columns_ag_by_model, type AGTableModelType, ModelType } from '@/common/types';
import { useGeneralStore } from '@/common/stores/general';
import type { ColDef } from 'ag-grid-community';

const store = useGeneralStore();
const route = useRoute();

const ref_base_table = ref<InstanceType<typeof AGTableBase> | null>(null);
const ref_header_table = ref<{ search_value?: string | number } | null>(null);

const model = computed<ModelType>(() => route.params.model as ModelType);
const columns = computed<ColDef[]>(() => get_columns_ag_by_model(model.value));
const rows = computed<AGTableModelType[]>(() => (store.models[model.value] as AGTableModelType[]) ?? []);

const itemsSearching = computed<AGTableModelType[]>(() => {
  const q = ref_header_table.value?.search_value?.toString().trim() ?? '';
  if (!q) return rows.value;
  const re = new RegExp(q, 'i');
  return rows.value.filter((item) =>
    re.test(
      Object.values(item as Record<string, unknown>)
        .join(' ')
        .toString()
    )
  );
});

const init = async () => {
  if (model.value) {
    await store.fetchRows(model.value, { relation_model: true });
  }
};

onMounted(init);
watch(model, init);
</script>

<template>
  <v-row v-if="model && rows" style="height: 50rem">
    <v-col cols="12">
      <UiParentCard>
        <AGTableHeader ref="ref_header_table" v-bind="{ child: ref_base_table, model, columns }" />
        <AGTableBase ref="ref_base_table" v-bind="{ columns, rows: itemsSearching }" />
      </UiParentCard>
    </v-col>
  </v-row>
</template>
