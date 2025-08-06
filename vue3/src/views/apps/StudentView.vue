<script setup lang="ts">
import {computed, onMounted} from 'vue';

import {useRoute, useRouter} from 'vue-router';
import {ModelType, type Student} from '@/common/types';
import AssignmentCards from '@/views/components/general/AssignmentCards.vue';
import {useAuthStore} from '@/common/stores/auth';
import StudentProfile from '@/views/components/general/StudentProfile.vue';
import {useGeneralStore} from '@/common/stores/general';

const router = useRouter();
const store = useGeneralStore();
const auth_store = useAuthStore();

const route = useRoute();
const init = async () => {
  await store.fetch_rows(ModelType.student, {
    query: [{key: 'id', value: student_id.value, opt: 'eq'}],
    relation_model: true
  });
  store.list[ModelType.assignment] = student.value.assignments as [];
  auth_store.student_id = student.value.id;
};

onMounted(async () => {
  await init();
});

const student_id = computed<number>(() => Number(route.params.id) );
const student = computed<Student>(() => store.list[ModelType.student][0]);
</script>
<template>
  <v-container v-if="student" fluid class="px-4 pt-4">
    <v-row align="start" justify="center" class="flex-wrap">
      <v-col cols="12" md="4" style="max-width: 25rem">
        <StudentProfile :student="student"/>
      </v-col>
      <v-col cols="12" md="8" style="max-width: 65rem">
        <AssignmentCards :assignments="student.assignments" @refresh="init"/>
      </v-col>
    </v-row>
  </v-container>
</template>
