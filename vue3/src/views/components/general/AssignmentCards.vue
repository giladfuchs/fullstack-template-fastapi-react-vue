<script setup lang="ts">
import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import UiChildCard from '@/views/components/shared/UiChildCard.vue';
import {type Assignment, ModelType} from '@/common/types';
import {useGeneralStore} from '@/common/stores/general';
import {useI18n} from "vue-i18n";

const {t} = useI18n();
interface Props {
  assignments: Assignment[];
}
const store = useGeneralStore();
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'refresh'): void;
}>();

const delete_row = async (assignment_id: number) => {
  await store.delete_rows(ModelType.assignment, {
    query: [{key: 'id', value: assignment_id, opt: 'eq'}],
  }, t(`success.delete.${ModelType.assignment}`));
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
        <ClipboardPlusIcon size="20"/>
      </v-btn>
    </template>
    <template v-for="(assignment, i) in props.assignments" :key="i">
      <UiChildCard :title="assignment.title" class="mb-4">
        <v-card variant="outlined" class="bg-gray100">
          <v-card-text>{{ assignment.detail }}</v-card-text>
        </v-card>
        <div class="d-flex justify-center mt-2">
          <v-btn icon variant="text" size="x-small" density="compact" @click="delete_row(assignment.id)">
            <TrashIcon size="20"/>
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn icon variant="text" size="x-small" density="compact" class="ml-2" :to="`/assignment/${assignment.id}`">
            <EditIcon size="20"/>
          </v-btn>
        </div>
      </UiChildCard>
    </template>
  </UiParentCard>
</template>
