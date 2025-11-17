import customShadows from '@/assets/themes/shadows';
import type { CustomizationStateProps } from '@/lib/types';

declare module '@mui/material/styles' {
    interface ThemeOptions {
        customShadows?: ReturnType<typeof customShadows>;
        customization?: CustomizationStateProps;
        darkTextSecondary?: string;
        textDark?: string;
        darkTextPrimary?: string;
        grey500?: string;
    }

    interface Theme {
        customShadows: ReturnType<typeof customShadows>;
        customization: CustomizationStateProps;
        darkTextSecondary: string;
        textDark: string;
        darkTextPrimary: string;
        grey500: string;
    }
}
