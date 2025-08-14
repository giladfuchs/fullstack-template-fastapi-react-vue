<script setup lang="ts">
import { onMounted } from 'vue';
import AuthLogin from '@/views/components/general/AuthLogin.vue';
import MainEasyTable from '@/views/components/table/easy_table/MainEasyTable.vue';
import { ModelType } from '@/common/types';
import { useGeneralStore } from '@/common/stores/general';

const store = useGeneralStore();

onMounted(async () => {
  await store.fetch_rows(ModelType.teacher);
});
</script>

<template>
  <v-row class="h-100vh" no-gutters>
    <v-col cols="12" class="d-flex align-center bg-lightprimary">
      <v-container>
        <div class="pa-7 pa-sm-12">
          <v-row justify="center">
            <v-col cols="12" lg="10" xl="6" md="7">
              <v-card elevation="0" class="loginBox">
                <v-card variant="outlined">
                  <v-card-text class="pa-9">
                    <v-row>
                      <v-col cols="12" class="text-center">
                        <h2 class="text-secondary text-h2 mt-8">{{ $t('Hi, Welcome Back') }}</h2>
                        <h4 class="text-disabled text-h4 mt-3">{{ $t('Enter your credentials to continue') }}</h4>
                      </v-col>
                    </v-row>

                    <AuthLogin />
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <MainEasyTable :model="ModelType.teacher" :rows="store.list[ModelType.teacher]" />
  </v-row>
</template>
<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>
