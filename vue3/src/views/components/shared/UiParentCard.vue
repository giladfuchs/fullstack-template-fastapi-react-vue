<script setup lang="ts">
defineProps<{ title?: string }>();
</script>

<template>
  <v-card variant="outlined" elevation="0" class="withbg">
    <v-card-item v-if="title">
      <div class="d-flex align-center justify-space-between w-100" style="flex-wrap: nowrap">
        <v-card-title class="text-h5 mb-0" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
          {{ title }}
        </v-card-title>
        <div class="d-flex align-center" style="flex-shrink: 0">
          <slot name="actions" />
        </div>
      </div>
    </v-card-item>
    <v-divider />
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
