<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/common/stores/auth';

const id = ref<number | null>(null);
const phone = ref<number | null>(null);

const isSubmitting = ref(false);
const apiError = ref<string | null>(null);

const formRef = ref();
const idRules = [(v: number | null) => !!v || 'Required'];
const phoneRules = [(v: number | null) => !!v || 'Required'];

const onSubmit = async () => {
  apiError.value = null;

  const res = await formRef.value?.validate?.();
  if (res?.valid === false) return;

  isSubmitting.value = true;
  try {
    const authStore = useAuthStore();
    await authStore.login({ id: id.value, phone: phone.value });
  } catch (err: any) {
    apiError.value = String(err?.message ?? err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <v-row>
    <v-col class="d-flex align-center">
      <v-divider class="custom-divider" />
    </v-col>
  </v-row>

  <h5 class="text-h5 text-center my-4 mb-8">
    {{ $t('Sign in with ID & Phone') }}
  </h5>

  <v-form ref="formRef" class="mt-7 loginForm" @submit.prevent="onSubmit">
    <v-text-field
        v-model="id"
        :label="$t('id')"
        class="mt-4 mb-8"
        required
        :rules="idRules"
        density="comfortable"
        hide-details="auto"
        variant="outlined"
        type="number"
        color="primary"
    />

    <v-text-field
        v-model="phone"
        :label="$t('phone')"
        required
        :rules="phoneRules"
        density="comfortable"
        variant="outlined"
        color="primary"
        hide-details="auto"
        type="number"
        class="pwdInput"
    />

    <div class="d-sm-flex align-center mt-2 mb-7 mb-sm-0"></div>

    <v-btn
        color="secondary"
        :loading="isSubmitting"
        block
        class="mt-2"
        variant="flat"
        size="large"
        :disabled="isSubmitting"
        type="submit"
    >
      {{ $t('Sign In') }}
    </v-btn>

    <div v-if="apiError" class="mt-2">
      <v-alert type="error" color="error">{{ apiError }}</v-alert>
    </div>
  </v-form>

  <div class="mt-5 text-right">
    <v-divider />
    <v-btn
        variant="plain"
        to="/teacher/add"
        class="mt-2 text-capitalize mr-n2"
    >
      {{ $t("Don't Have an account?") }}
    </v-btn>
  </div>
</template>

<style lang="scss">
.custom-divider {
  border-color: rgba(0, 0, 0, 0.08) !important;
}

.pwdInput {
  position: relative;

  .v-input__append {
    position: absolute;
    right: 10px;
  }
}

.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>