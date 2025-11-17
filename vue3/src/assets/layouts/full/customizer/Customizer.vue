<script setup lang="ts">
import { ref } from 'vue';
import { useCustomizerStore } from '@/common/stores/customizer';
import { ChecksIcon } from 'vue-tabler-icons';

const customizer = useCustomizerStore();

const themeColors = ref([
  {
    name: 'PurpleTheme',
    bg: 'themeBluePurple'
  },
  {
    name: 'GreenTheme',
    bg: 'themeGreenDark'
  },
  {
    name: 'PinkTheme',
    bg: 'themePink'
  },
  {
    name: 'YellowTheme',
    bg: 'themeYellow'
  },
  {
    name: 'SeaGreenTheme',
    bg: 'themeSeaGreen'
  },
  {
    name: 'OliveGreenTheme',
    bg: 'themeOliveGreen'
  },
  {
    name: 'SpeechBlueTheme',
    bg: 'themeSpeechBlue'
  }
]);

// Dark Theme Colors
const DarkthemeColors = ref([
  { name: 'DarkPurpleTheme', bg: 'themeDarkPurple' },
  { name: 'DarkGreenTheme', bg: 'themeDarkGreen' },
  { name: 'DarkPinkTheme', bg: 'themeDarkPink' },
  { name: 'DarkYellowTheme', bg: 'themeDarkYellow' },
  { name: 'DarkSeaGreenTheme', bg: 'themeDarkSeaGreen' },
  { name: 'DarkOliveGreenTheme', bg: 'themeDarkOliveGreen' },
  { name: 'DarkSpeechBlueTheme', bg: 'themeDarkSpeechBlue' }
]);

const fontFamily = ref(['Roboto', 'Poppins', 'Inter']);
</script>

<template style="z-index: 21">
  <div class="pa-5">
    <v-row>
      <v-col cols="12">
        <v-card variant="outlined">
          <v-card-item class="py-3">
            <v-card-title class="text-subtitle-1 font-weight-medium">{{ $t('direction') }}</v-card-title>
          </v-card-item>
          <v-divider class="border-light"></v-divider>
          <v-card-text>
            <v-switch v-model="customizer.isRtl" color="primary" label="RTL" hide-details></v-switch>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card variant="outlined">
          <v-card-item class="py-3">
            <v-card-title class="text-subtitle-1 font-weight-medium">{{ $t('preset_color') }}</v-card-title>
          </v-card-item>
          <v-divider class="border-light"></v-divider>
          <v-card-text>
            <v-item-group v-model="customizer.actTheme" mandatory>
              <v-item v-for="theme in themeColors" v-slot="{ isSelected, toggle }" :key="theme.name" :value="theme.name">
                <v-avatar rounded="sm" :class="theme.bg" class="mr-2 cursor-pointer ma-2" size="40" @click="toggle">
                  <ChecksIcon v-if="isSelected" color="white" />
                </v-avatar>
              </v-item>
            </v-item-group>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card variant="outlined">
          <v-card-item class="py-3">
            <v-card-title class="text-subtitle-1 font-weight-medium">{{ $t('dark_preset_color') }}</v-card-title>
          </v-card-item>
          <v-divider class="border-light"></v-divider>
          <v-card-text>
            <v-item-group v-model="customizer.actTheme" mandatory>
              <v-item v-for="theme in DarkthemeColors" v-slot="{ isSelected, toggle }" :key="theme.name" :value="theme.name">
                <v-avatar rounded="sm" :class="theme.bg" class="mr-2 cursor-pointer ma-2" size="40" @click="toggle">
                  <ChecksIcon v-if="isSelected" color="white" />
                </v-avatar>
              </v-item>
            </v-item-group>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card variant="outlined">
          <v-card-item class="py-3">
            <v-card-title class="text-subtitle-1 font-weight-medium">{{ $t('font_family') }}</v-card-title>
          </v-card-item>
          <v-divider class="border-light"></v-divider>
          <v-card-text>
            <v-radio-group v-model="customizer.fontTheme" hide-details>
              <v-radio v-for="font in fontFamily" :key="font" :label="$t(font)" :value="font" color="primary"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss"></style>
