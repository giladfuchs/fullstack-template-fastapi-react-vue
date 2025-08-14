<script setup lang="ts">
import { ref } from 'vue';

import { AgGridVue } from 'ag-grid-vue3';
import type { ColDef, GridApi } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useCustomizerStore } from '@/common/stores/customizer';
import ActionRenderer from '@/views/components/table/ag_table/renderer/ActionRenderer.vue';
import AssignmentsRenderer from '@/views/components/table/ag_table/renderer/AssignmentsRenderer.vue';
import { useI18n } from 'vue-i18n';
import type { AGTableModelType } from '@/common/types';

const { t } = useI18n();
const customizer = useCustomizerStore();

interface Props {
  columns: ColDef[];
  rows: AGTableModelType[];
}

const props = defineProps<Props>();
const localizedCols: ColDef[] = props.columns.map((field: any) => ({
  ...field,
  headerName: t(`ag.headerName.${field.field}`)
}));

const gridApi = ref<GridApi | null>(null);

const gridOptions = {
  enableCellTextSelection: true,
  animateRows: true,
  rowSelection: 'multiple',
  suppressRowClickSelection: true
};
const gridComponents = {
  ActionRenderer,
  AssignmentsRenderer
};

const onGridReady = (params: any) => {
  gridApi.value = params.api as GridApi;
};
const onFirstDataRendered = (params: any) => {
  setTimeout(() => {
    const el = window.document.querySelector('.grid-distributors');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 500);
};

const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: true,
  enableCellTextSelection: true,
  editable: true
};
const exportDataAsCsv = () => gridApi.value?.exportDataAsCsv();

defineExpose({ exportDataAsCsv });
</script>

<template>
  <ag-grid-vue
      :class="`ag-theme-alpine`"
      :style="{ height: (props.rows.length > 10 ? 550 : props.rows.length > 6 ? 400 : 300) + 'px' }"
      :columnDefs="localizedCols"
      :rowData="props.rows"
      :rowHeight="40"
      :defaultColDef="defaultColDef"
      :gridOptions="gridOptions"
      :components="gridComponents"
      @grid-ready="onGridReady"
      @first-data-rendered="onFirstDataRendered"
      v-if="props.rows"
  />



</template>

<style scoped lang="scss">
.ag-theme-alpine,
.ag-theme-quartz {
  --ag-input-icon-color: transparent;
}

</style>