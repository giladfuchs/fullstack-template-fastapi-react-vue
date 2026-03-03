<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import type { inputFilters } from '@/common/types/form';
import { ModelType } from '@/common/types';
import { useRouter } from 'vue-router';

interface Props {
  controls: inputFilters;
  model: ModelType;
  isAdd: boolean;
}
const emit = defineEmits<{
  (e: 'sendForm', controls: inputFilters): void;
}>();
const { controls, model, isAdd } = defineProps<Props>();

const router = useRouter();
const controls_ref = ref<inputFilters>(controls);
</script>

<template>
  <UiParentCard :title="isAdd ? $t(`form_header_add_${model}`) : $t(`form_header_edit_${model}`)">
    <template #actions>
      <v-btn
        color="primary"
        variant="text"
        density="comfortable"
        class="text-body-2 font-weight-medium"
        style="min-width: auto"
        @click="router.back()"
      >
        <ArrowLeftIcon size="20" />
        {{ $t('back') }}
      </v-btn>
    </template>
    <v-col v-for="(config, field) in controls_ref" :key="field" cols="12" style="display: flex; flex-direction: row; margin: -1rem -1rem">
      <v-textarea
        v-if="config.type === 'textarea'"
        v-model="config.value"
        variant="outlined"
        color="primary"
        :label="$t(field)"
        rows="4"
      ></v-textarea>

      <v-text-field
        v-else-if="!config.options"
        v-model="config.value"
        style="width: 100%"
        color="primary"
        clearable
        :type="config.type"
        :label="$t(field)"
        variant="outlined"
      ></v-text-field>

      <v-autocomplete
        v-else
        v-model="config.value as string"
        style="width: 100%"
        :label="$t(field)"
        :items="config.options"
        variant="outlined"
        color="primary"
        dense
      />
    </v-col>
    <v-col cols="12" class="d-flex align-center justify-center">
      <v-btn color="primary" @click="emit('sendForm', controls_ref)">{{ $t('form_send_button') }}</v-btn>
    </v-col>
  </UiParentCard>
</template>
