<script setup lang="ts">
import { ref } from 'vue';

import { AgGridVue } from 'ag-grid-vue3';
import { ColDef, GridApi } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

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

const gridApi = ref<GridApi>(new GridApi());

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
  gridApi.value = params.api;
};
const onFirstDataRendered = (params: any) => {
  setTimeout(() => {
    const el = window.document.querySelector('.grid-distributors');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, 500);
};

const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: true,
  enableCellTextSelection: true,
  editable: true
};
const exportDataAsCsv = function () {
  gridApi.value.exportDataAsCsv();
};
defineExpose({
  exportDataAsCsv
});
</script>

<template>
  <ag-grid-vue
    :class="`ag-theme-alpine${customizer.actTheme.includes('Dark') ? '  ag-theme-customdark' : ' '}`"
    :style="{ height: (props.rows.length > 10 ? 550 : props.rows.length > 6 ? 400 : 300) + 'px' }"
    :columnDefs="localizedCols"
    :rowData="props.rows"
    :defaultColDef="defaultColDef"
    :gridOptions="gridOptions"
    :components="gridComponents"
    @grid-ready="onGridReady"
    @first-data-rendered="onFirstDataRendered"
    v-if="props.rows"
  ></ag-grid-vue>
</template>
<style scoped lang="scss">
.ag-theme-alpine {
  --ag-header-foreground-color: #4267b2;
  --ag-header-background-color: #cce4f6;
  --ag-header-cell-hover-background-color: #1da1f2;
  --ag-header-cell-moving-background-color: #0f5f9b;
}

.ag-theme-customdark {
  --ag-header-foreground-color: #143c33;
  --ag-header-background-color: #009688;
  --ag-odd-row-background-color: #546e7a;
  --ag-background-color: #607d8b;
}

.ag-theme-alpine .ag-header {
  font-family: cursive;
}

.ag-theme-alpine .ag-header-group-cell {
  font-weight: normal;
  font-size: 22px;
}

.ag-theme-alpine .ag-header-cell {
  font-size: 18px;
}
</style>
