<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import { PhoneIcon, SchoolIcon } from 'vue-tabler-icons';
import { ModelType, type Student } from '@/common/types';
import { useGeneralStore } from '@/common/stores/general';
import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import {useI18n} from "vue-i18n";
const { t } = useI18n();

interface Props {
  student: Student;
}

const store = useGeneralStore();

const props = defineProps<Props>();

const student = computed(() => props.student);
const delete_row = async () => {
  await store.delete_rows(ModelType.student, {
    query: [{ key: 'id', value: student.value.id, opt: 'eq' }],
  },t(`success.delete.${ModelType.student}`));
};
const items = ref([
  { text: 'Phone', icon: PhoneIcon, divider: true },
  { text: 'Grade', icon: SchoolIcon, divider: true }
]);
</script>
<template>
  <UiParentCard :title="student.name">
    <template #actions>
      <v-card-actions class="pa-0">
        <v-btn :to="`/student/${student.id}`" icon variant="text" size="x-small" density="compact" aria-label="Edit">
          <EditIcon size="18" />
        </v-btn>
        <v-btn icon variant="text" size="x-small" density="compact" @click="delete_row" aria-label="Delete">
          <TrashIcon size="18" />
        </v-btn>
      </v-card-actions>
    </template>
    <v-list>
      <template v-for="(item, i) in items" :key="i">
        <v-list-item>
          <template v-slot:prepend>
            <component :is="item.icon" size="20" stroke-width="1.5" class="mr-2" />
          </template>
          <v-list-item-title class="text-subtitle-1">{{ item.text }}</v-list-item-title>
          <template v-slot:append>
            <span class="text-subtitle-2 text-disabled font-weight-medium">
              {{ student[item.text.toLowerCase()] }}
            </span>
          </template>
        </v-list-item>
        <v-divider v-if="item.divider"></v-divider>
      </template>
    </v-list>
  </UiParentCard>
</template>
