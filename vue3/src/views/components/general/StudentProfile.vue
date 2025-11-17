<script setup lang="ts">
import { type Component, markRaw } from 'vue';
import { useRouter } from 'vue-router';

import { PhoneIcon, SchoolIcon, EditIcon, TrashIcon } from 'vue-tabler-icons';
import { ModelType, type Student } from '@/common/types';
import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import { useI18n } from 'vue-i18n';
import { deleteRowById } from '@/common/api';

const { t } = useI18n();
const router = useRouter();
const { student } = defineProps<{
  student: Student;
}>();

type StudentItem = { icon: Component; key: keyof Pick<Student, 'phone' | 'grade'> };

const items: StudentItem[] = [
  { icon: markRaw(PhoneIcon), key: 'phone' },
  { icon: markRaw(SchoolIcon), key: 'grade' }
];
const delete_row = async () => {
  await deleteRowById({ model: ModelType.student, id: student.id, message: t(`success.delete.${ModelType.student}`) });
  await router.push(`/${ModelType.student}`);
};
</script>

<template>
  <UiParentCard :title="student.name">
    <template #actions>
      <v-card-actions class="pa-0">
        <v-btn :to="`/student/${student.id}`" icon variant="text" size="x-small" density="compact" aria-label="Edit">
          <EditIcon :size="18" />
        </v-btn>
        <v-btn icon variant="text" size="x-small" density="compact" aria-label="Delete" @click="delete_row">
          <TrashIcon :size="18" />
        </v-btn>
      </v-card-actions>
    </template>

    <v-list>
      <template v-for="(item, i) in items" :key="i">
        <v-list-item>
          <template #prepend>
            <component :is="item.icon" :size="20" :stroke-width="1.5" class="mr-2" />
          </template>
          <v-list-item-title class="text-subtitle-1">{{ $t(item.key) }}</v-list-item-title>
          <template #append>
            <span class="text-subtitle-2 text-disabled font-weight-medium">
              {{ student[item.key] }}
            </span>
          </template>
        </v-list-item>
        <v-divider />
      </template>
    </v-list>
  </UiParentCard>
</template>
