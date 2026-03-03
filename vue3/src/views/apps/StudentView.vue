<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ModelType, type Student } from '@/common/types';
import AssignmentCards from '@/views/components/general/AssignmentCards.vue';
import StudentProfile from '@/views/components/general/StudentProfile.vue';
import { useAuthStore } from '@/common/stores/auth';
import { fetchRowById } from '@/common/api';

const auth_store = useAuthStore();
const router = useRouter();
const route = useRoute();

const student_id = computed<number>(() => Number(route.params.id));
const student = ref<Student | null>(null);

const init = async () => {
  try {
    const data = (await fetchRowById({
      model: ModelType.student,
      id: student_id.value,
      relation: true
    })) as Student;

    student.value = data;
    auth_store.student_id = data.id;
  } catch {
    await router.replace({ path: '/error' });
  }
};

onMounted(async () => {
  await init();
});
</script>

<template>
  <v-container v-if="student" fluid class="px-4 pt-4">
    <v-row align="start" justify="center" class="flex-wrap">
      <v-col cols="12" md="4" style="max-width: 25rem">
        <StudentProfile :student="student" />
      </v-col>
      <v-col cols="12" md="8" style="max-width: 65rem">
        <AssignmentCards :assignments="student.assignments" @refresh="init" />
      </v-col>
    </v-row>
  </v-container>
</template>
