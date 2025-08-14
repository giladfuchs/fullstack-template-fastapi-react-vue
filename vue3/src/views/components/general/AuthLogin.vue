<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/common/stores/auth';
import { Form, Field } from 'vee-validate';

const valid = ref(false);
const id = ref();
const phone = ref();

function validate(values: any, { setErrors }: any) {
  const authStore = useAuthStore();
  return authStore.login({ id: id.value, phone: phone.value }).catch((error: any) => setErrors({ apiError: error }));
}
</script>

<template>
  <v-row>
    <v-col class="d-flex align-center">
      <v-divider class="custom-devider" />
    </v-col>
  </v-row>
  <h5 class="text-h5 text-center my-4 mb-8">{{ $t('Sign in with ID & Phone') }}</h5>
  <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <v-text-field
      v-model="id"
      :label="$t('id')"
      class="mt-4 mb-8"
      required
      density="comfortable"
      hide-details="auto"
      variant="outlined"
      type="number"
      color="primary"
    ></v-text-field>
    <v-text-field
      v-model="phone"
      :label="$t('phone')"
      required
      density="comfortable"
      variant="outlined"
      color="primary"
      hide-details="auto"
      type="number"
      class="pwdInput"
    ></v-text-field>

    <div class="d-sm-flex align-center mt-2 mb-7 mb-sm-0"></div>
    <v-btn color="secondary" :loading="isSubmitting" block class="mt-2" variant="flat" size="large" :disabled="valid" type="submit">
      {{ $t('Sign In') }}
    </v-btn>
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
  <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/teacher/add" class="mt-2 text-capitalize mr-n2">{{ $t("Don't Have an account?") }}</v-btn>
  </div>
</template>
<style lang="scss">
.custom-devider {
  border-color: rgba(0, 0, 0, 0.08) !important;
}

.googleBtn {
  border-color: rgba(0, 0, 0, 0.08);
  margin: 30px 0 20px 0;
}

.outlinedInput .v-field {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: none;
}

.orbtn {
  padding: 2px 40px;
  border-color: rgba(0, 0, 0, 0.08);
  margin: 20px 15px;
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
