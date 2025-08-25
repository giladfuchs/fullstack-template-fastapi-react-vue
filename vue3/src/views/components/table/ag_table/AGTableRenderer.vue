<script setup lang="ts">
import { computed, ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import type { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

import ActionRenderer from '@/views/components/table/ag_table/renderer/ActionRenderer.vue';
import AssignmentsRenderer from '@/views/components/table/ag_table/renderer/AssignmentsRenderer.vue';
import { useI18n } from 'vue-i18n';
import type { AGTableModelType } from '@/common/types';
import { useCustomizerStore } from '@/common/stores/customizer';

const { t } = useI18n();

interface Props {
  columns: ColDef[];
  rows: AGTableModelType[];
}
const { columns, rows } = defineProps<Props>();

const customizer = useCustomizerStore();

const themeClass = computed(() => (customizer.actTheme.includes('Dark') ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'));
const localizedCols: ColDef[] = columns.map((col: ColDef) => ({
  ...col,
  headerName: t(`ag.headerName.${col.field as string}`),
  valueFormatter: col.valueFormatter ?? ((p) => (p.value && typeof p.value === 'object' ? '' : p.value))
}));

const gridApi = ref<GridApi | null>(null);

const gridOptions: GridOptions<AGTableModelType> = {
  enableCellTextSelection: true,
  animateRows: true
};

const gridComponents = {
  ActionRenderer,
  AssignmentsRenderer
};

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api as GridApi;
};

const onFirstDataRendered = () => {
  setTimeout(() => {
    const el = window.document.querySelector('.grid-distributors');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 500);
};

const defaultColDef: ColDef = {
  resizable: true,
  sortable: true,
  filter: true
};

const exportDataAsCsv = (fileName?: string) =>
  gridApi.value?.exportDataAsCsv({
    fileName,
    processCellCallback: (p) => {
      const v = p.value;
      if (v == null) return '';
      if (typeof v === 'object') return JSON.stringify(v);
      return String(v);
    }
  });
defineExpose({ exportDataAsCsv });
</script>

<template>
  <ag-grid-vue
    v-if="rows"
    :class="themeClass"
    :theme="'legacy'"
    :style="{ height: (rows.length > 10 ? 550 : rows.length > 6 ? 400 : 300) + 'px' }"
    :enable-rtl="customizer.isRtl"
    :column-defs="localizedCols"
    :row-data="rows"
    :row-height="42"
    :default-col-def="defaultColDef"
    :grid-options="gridOptions"
    :components="gridComponents"
    @grid-ready="onGridReady"
    @first-data-rendered="onFirstDataRendered"
  />
</template>
