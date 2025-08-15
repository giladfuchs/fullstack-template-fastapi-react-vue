<script setup lang="ts">
import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import UiChildCard from '@/views/components/shared/UiChildCard.vue';
import { type Assignment, ModelType } from '@/common/types';
import { useGeneralStore } from '@/common/stores/general';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
interface Props {
  assignments: Assignment[];
}
const store = useGeneralStore();
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'refresh'): void;
}>();

const delete_row = async (assignment_id: number) => {
  await store.delete_rows(
    ModelType.assignment,
    {
      query: [{ key: 'id', value: assignment_id, opt: 'eq' }]
    },
    t(`success.delete.${ModelType.assignment}`)
  );
  emit('refresh');
};
</script>
<template>
  <UiParentCard :title="$t('assignment_table')">
    <template #actions>
      <v-btn
        :to="`/assignment/add`"
        color="primary"
        variant="text"
        density="comfortable"
        class="text-body-2 font-weight-medium"
        style="min-width: auto"
      >
        <ClipboardPlusIcon size="20" />
      </v-btn>
    </template>
    <v-row dense>
      <v-col v-for="(assignment, i) in props.assignments" :key="i" cols="12" md="6">
        <UiChildCard :title="assignment.title">
          <v-card-text>{{ assignment.detail }}</v-card-text>
          <v-card-actions class="d-flex justify-space-between px-2 pt-0">
            <v-btn icon variant="text" size="x-small" density="compact" color="warning" @click="delete_row(assignment.id)">
              <TrashIcon size="20" />
            </v-btn>

            <v-btn icon variant="text" size="x-small" density="compact" :to="`/assignment/${assignment.id}`">
              <EditIcon size="20" />
            </v-btn>
          </v-card-actions>
        </UiChildCard>
      </v-col>
    </v-row>
  </UiParentCard>
</template>
