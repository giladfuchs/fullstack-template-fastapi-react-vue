<script setup lang="ts">
import { ref, computed } from 'vue';
import UiParentCard from '@/views/components/shared/UiParentCard.vue';

import type { Header } from 'vue3-easy-data-table';
import { EasyTableModelType, ModelType } from '@/common/types';
import { get_columns_easy_table_by_model } from '@/common/types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  rows: EasyTableModelType[];
  model: ModelType;
}
const { rows, model } = defineProps<Props>();

const headers = computed<Header[]>(() =>
  get_columns_easy_table_by_model(model).map((row: Header) => {
    return { ...row, text: t(row.value) };
  })
);

const searchValue = ref('');
const items = computed<EasyTableModelType[]>(() => {
  let ans = rows;
  if (searchValue.value !== '') {
    const regex = new RegExp(searchValue.value, 'i');
    ans = ans.filter((item: EasyTableModelType) => regex.test(Object.values(item).join(' ')));
  }
  return ans;
});

const themeColor = ref('rgb(var(--v-theme-secondary))');
</script>
<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="6">
      <UiParentCard>
        <v-row justify="space-between" class="d-flex flex-row align-center justify-center mb-1">
          <v-col class="d-flex flex-row" cols="3" sm="3" md="2">
            <h1 class="ml-3">{{ $t(`${model}_table`) }}</h1>
          </v-col>
          <v-col class="d-flex flex-row" cols="10" sm="10" md="5">
            <v-btn
              v-if="model === ModelType.teacher"
              :href="`${model}/add`"
              rounded="md"
              active-color="secondary"
              icon
              color="secondary"
              variant="text"
            >
              <ClipboardPlusIcon size="40" />
            </v-btn>
            <v-text-field
              v-model="searchValue"
              type="text"
              variant="outlined"
              placeholder="Search"
              density="compact"
              hide-details
              prepend-inner-icon="mdi-magnify"
            />
          </v-col>
        </v-row>
        <div>
          <EasyDataTable
            :headers="headers"
            :items="items"
            table-class-name="customize-table"
            :theme-color="themeColor"
            :rows-per-page="100"
            :rows-items="[100, 500, 1000, 2000]"
          >
          </EasyDataTable>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
