import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {
  PurpleTheme,
  GreenTheme,
  PinkTheme,
  YellowTheme,
  SeaGreenTheme,
  OliveGreenTheme,
  SpeechBlueTheme
} from '@/assets/layouts/theme/LightTheme';
import {
  DarkPurpleTheme,
  DarkGreenTheme,
  DarkSpeechBlueTheme,
  DarkOliveGreenTheme,
  DarkPinkTheme,
  DarkYellowTheme,
  DarkSeaGreenTheme
} from '@/assets/layouts/theme/DarkTheme';

export default createVuetify({
  components,
  directives,

  theme: {
    defaultTheme: 'DarkGreenTheme',
    themes: {
      DarkGreenTheme,

      PurpleTheme,
      GreenTheme,
      PinkTheme,
      YellowTheme,
      SeaGreenTheme,
      OliveGreenTheme,
      SpeechBlueTheme,
      DarkPurpleTheme,
      DarkSpeechBlueTheme,
      DarkOliveGreenTheme,
      DarkPinkTheme,
      DarkYellowTheme,
      DarkSeaGreenTheme
    }
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md'
    },
    VTextField: {
      rounded: 'lg'
    }
  }
});
