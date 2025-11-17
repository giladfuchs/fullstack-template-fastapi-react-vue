<script setup lang="ts"></script>

<template>
  <v-row no-gutters class="h-100vh">
    <v-col class="d-flex align-center justify-center">
      <div class="text-center">
        <div class="CardMediaWrapper">
          <img src="../../../assets/images/img-error-bg.svg" alt="grid" class="w-100" />
          <img src="../../../assets/images/img-error-blue.svg" alt="grid" class="CardMediaParts" />
          <img src="../../../assets/images/img-error-text.svg" alt="build" class="CardMediaBuild" />
          <img src="../../../assets/images/img-error-purple.svg" alt="build" class="CardMediaBuild" />
        </div>
        <h3 class="text-h3">{{ $t('something_wrong') }}</h3>
        <p>
          {{ $t('page_not_found_msg1') }} <br />
          {{ $t('page_not_found_msg2') }}
        </p>
        <v-btn variant="flat" color="primary" class="mt-4" to="/" prepend-icon="mdi-home"> Home</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.CardMediaWrapper {
  max-width: 720px;
  margin: 0 auto;
  position: relative;
}

.CardMediaBuild {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: 5s bounce ease-in-out infinite;
}

.CardMediaParts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: 10s blink ease-in-out infinite;
}
</style>
