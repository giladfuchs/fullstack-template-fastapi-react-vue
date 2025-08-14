<script setup lang="ts">
import { ref, computed } from 'vue';
import UiParentCard from '@/views/components/shared/UiParentCard.vue';

import type { Header } from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { ModelType } from '@/common/types';
import { get_columns_easy_table_by_model } from '@/common/types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  rows: [];
  model: ModelType;
}

const props = defineProps<Props>();
const headers = computed<Header[]>(() =>
  get_columns_easy_table_by_model(props.model).map((row: any) => {
    return { ...row, text: t(row.text) };
  })
);

const searchValue = ref('');
const items = computed(() => {
  let ans = props.rows as any;
  if (searchValue.value !== '') {
    const regex = new RegExp(searchValue.value, 'i');
    ans = ans.filter((item: any) => regex.test(Object.values(item).join(' ')));
  }

  return ans;
});

const themeColor = ref('rgb(var(--v-theme-secondary))');
</script>
<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard>
        <v-row justify="space-between" class="d-flex flex-row align-center justify-center mb-1">
          <h1 class="ml-3">{{ $t(`${props.model}_table`) }}</h1>

          <v-col class="d-flex flex-row" cols="3" md="3">
            <v-btn
              v-if="props.model === ModelType.teacher"
              :href="`${props.model}/add`"
              rounded="md"
              active-color="secondary"
              icon
              color="secondary"
              variant="text"
            >
              <ClipboardPlusIcon size="20" />
            </v-btn>
            <v-text-field
              type="text"
              variant="outlined"
              placeholder="Search"
              v-model="searchValue"
              density="compact"
              hide-details
              prepend-inner-icon="mdi-magnify"
            />
          </v-col>
        </v-row>
        <div class="overflow-auto">
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
