<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import {
  ModelType,
  createInputFiltersFormFields,
  get_form_by_model,
  type inputFilters,
  FormApiError,
  formToBodyData,
  type FieldValue,
  type FormModelType
} from '@/common/types';
import DynamicForm from '@/views/components/form/DynamicForm.vue';
import FormError from '@/views/components/form/FormError.vue';
import API, { fetchRowById } from '@/common/api';
import { useAuthStore } from '@/common/stores/auth';
import { useToast } from 'vue-toastification';

const { t } = useI18n();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const auth_store = useAuthStore();

const model = computed<ModelType>(() => route.params.model as ModelType);
const url = computed<string>(() => route.params.url as string);
const isAdd = computed<boolean>(() => url.value === 'add');

const fieldError = ref<string>('');
const objData = ref<Record<string, FieldValue> | FormModelType>({});
const controls = ref<inputFilters>({} as inputFilters);

watch(
  [model, objData],
  () => {
    controls.value = createInputFiltersFormFields(get_form_by_model(model.value), objData.value as Record<string, FieldValue>);
  },
  { deep: true, immediate: true }
);

onMounted(async () => {
  if (isAdd.value) {
    return;
  }
  try {
    objData.value = await fetchRowById({ model: model.value, id: url.value });
  } catch {
    await router.replace({ path: '/error' });
  }
});

const create_update = async (data: inputFilters) => {
  fieldError.value = '';
  const message = t(isAdd.value ? 'toast.create_success' : 'toast.edit_success', {
    model: t(`models.${model.value}`)
  });
  const body = formToBodyData(data);
  try {
    if (model.value === ModelType.student) {
      body.teacher_id = auth_store.user_id;
    } else if (model.value === ModelType.assignment) {
      body.teacher_id = auth_store.user_id;
      body.student_id = auth_store.student_id;
    }
    await API.post(`${model.value}/${url.value}`, body, { suppressToast: true });
    toast.success(message);
    if (model.value === ModelType.teacher) {
      await router.push('/login');
    } else if (model.value === ModelType.student && isAdd.value) {
      await router.push(`/${ModelType.student}`);
    } else {
      await router.push(`/${ModelType.student}/view/${auth_store.student_id}`);
    }
  } catch (err: unknown) {
    const e = err as FormApiError;
    let intlId = e?.message ?? 'form.error';
    const errors = e?.errors;
    if (Array.isArray(errors) && errors.length > 0 && errors[0]?.field) {
      intlId = `form.label.${errors[0].field}`;
    }
    fieldError.value = intlId;
  }
};
</script>

<template>
  <v-row justify="center">
    <v-col class="d-flex flex-row mt-2 justify-space-around" cols="12" sm="12" md="4">
      <DynamicForm
        v-if="isAdd || (objData && Object.keys(objData).length)"
        :key="`${model}-${url}`"
        :is-add="isAdd"
        :model="model"
        :controls="controls"
        @send-form="create_update"
      />
    </v-col>
  </v-row>
  <FormError :field-error="fieldError" />
</template>
