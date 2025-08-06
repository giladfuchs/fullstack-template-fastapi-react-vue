<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import type { inputFilters } from '@/common/types/form';
import { ModelType } from '@/common/types';
import { useRouter } from 'vue-router';

interface Props {
  controls: inputFilters;
  model: ModelType;
  is_add: boolean;
}

const props = defineProps<Props>();
const router = useRouter();
const controls = ref<inputFilters>(props.controls);
</script>

<template>
  <UiParentCard :title="props.is_add ? $t(`form_header_add_${props.model}`) : $t(`form_header_edit_${props.model}`)">
    <template #actions>
      <v-btn
        @click="router.back()"
        color="primary"
        variant="text"
        density="comfortable"
        class="text-body-2 font-weight-medium"
        style="min-width: auto"
      >
        <ArrowLeftIcon size="20" />
        {{ $t('back') }}
      </v-btn>
    </template>
    <v-col cols="12" v-for="(config, field) in controls" :key="field" style="display: flex; flex-direction: row; margin: -1rem -1rem">
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
        style="width: 100%"
        color="primary"
        clearable
        :type="config.type"
        v-model="config.value"
        :label="$t(field)"
        variant="outlined"
      ></v-text-field>

      <v-autocomplete
        v-else
        style="width: 100%"
        v-model="config.value"
        :label="$t(field)"
        :items="config.options"
        variant="outlined"
        color="primary"
        dense
      />
    </v-col>
    <v-col cols="12" class="d-flex align-center justify-center">
      <v-btn color="primary" @click="$emit('sendForm', controls)">{{ $t('form_send_button') }}</v-btn>
    </v-col>
  </UiParentCard>
</template>
