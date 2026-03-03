<script setup lang="ts">
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';

const { fieldError } = defineProps<{
  fieldError: string;
}>();

const { t } = useI18n();
const toast = useToast();

const isFieldSpecific = computed(() => fieldError?.startsWith('form.label.'));
const isUnique = computed(() => fieldError?.includes('unique:'));
const baseFieldId = computed(() => {
  const fe = fieldError || '';
  if (isUnique.value) return fe.slice(fe.indexOf('unique:') + 'unique:'.length);
  if (isFieldSpecific.value) return fe.slice('form.label.'.length);
  return '';
});

watch(
  () => fieldError,
  (val) => {
    if (!val) return;

    const error_msg = isUnique.value
      ? t('form.error.unique', { field: t(baseFieldId.value) })
      : isFieldSpecific.value
        ? t('form.error.required.dynamic', { field: t(baseFieldId.value) })
        : t('form.error');

    toast.error(error_msg);
  },
  { immediate: true }
);
</script>

<template>
  <h4 v-if="fieldError" class="text-error text-h4 mt-3 text-center">
    <template v-if="isUnique">
      {{ t('form.error.unique', { field: t(baseFieldId) }) }}
    </template>

    <template v-else-if="isFieldSpecific">
      {{ t('form.error.required.dynamic', { field: t(baseFieldId) }) }}
    </template>

    <template v-else-if="fieldError === 'form.error'">
      {{ t(fieldError) }}
    </template>

    <template v-else>
      {{ fieldError }}
    </template>
  </h4>
</template>
