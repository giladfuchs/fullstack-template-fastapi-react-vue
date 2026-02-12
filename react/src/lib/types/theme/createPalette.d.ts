/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface PaletteColor {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    }

    interface IconPaletteColor {
        main: string;
    }

    interface Palette {
        orange: PaletteColor;
        dark: PaletteColor;
        icon: IconPaletteColor;
    }
}
