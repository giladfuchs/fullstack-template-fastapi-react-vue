<script setup lang="ts">
import { computed } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { ModelType, create_form_fields, get_form_by_model, type inputFilters } from '@/common/types';
import DynamicForm from '@/views/components/form/DynamicForm.vue';

import { useGeneralStore } from '@/common/stores/general';

import { array_obj_to_obj_with_key } from '@/common/helper';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const router = useRouter();

const route = useRoute();

const general_store = useGeneralStore();

const url = computed<string>(() => route.params.url as string);
const model = computed<ModelType>(() => route.params.model as ModelType);
const is_add: boolean = url.value === 'add';
const obj = is_add ? {} : array_obj_to_obj_with_key(general_store.list[model.value] as [], +url.value, 'id');

const controls = computed<inputFilters>(() => create_form_fields(get_form_by_model(model.value), obj));

const create_update = async (data: inputFilters) => {
  const message = t(is_add ? 'toast.create_success' : 'toast.edit_success', {
    model: t(`models.${model.value}`)
  });
  await general_store.create_update_row_input_form(data, model.value, url.value, is_add, message);
};
</script>
<template>
  <v-row justify="center">
    <v-col class="d-flex flex-row mt-2 justify-space-around" cols="12" sm="12" md="4">
      <DynamicForm :is_add="is_add" :model="model" :controls="controls" @sendForm="create_update" />
    </v-col>
  </v-row>
</template>
