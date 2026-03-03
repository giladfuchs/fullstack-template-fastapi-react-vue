import type { CustomTypography } from './types';

export default function themePalette(theme: CustomTypography) {
    const isDark = theme.customization.navType === 'dark';
    const c = theme.colors;

    return {
        mode: theme.customization.navType,

        common: {
            black: c.darkPaper
        },

        primary: {
            light: isDark ? c.darkPrimaryLight : c.primaryLight,
            main: isDark ? c.darkPrimaryMain : c.primaryMain,
            dark: isDark ? c.darkPrimaryDark : c.primaryDark,
            200: isDark ? c.darkPrimary200 : c.primary200,
            800: isDark ? c.darkPrimary800 : c.primary800
        },

        secondary: {
            light: isDark ? c.darkSecondaryLight : c.secondaryLight,
            main: isDark ? c.darkSecondaryMain : c.secondaryMain,
            dark: isDark ? c.darkSecondaryDark : c.secondaryDark,
            200: isDark ? c.darkSecondary200 : c.secondary200,
            800: isDark ? c.darkSecondary800 : c.secondary800
        },

        error: { light: c.errorLight, main: c.errorMain, dark: c.errorDark },
        orange: { light: c.orangeLight, main: c.orangeMain, dark: c.orangeDark },
        warning: { light: c.warningLight, main: c.warningMain, dark: c.warningDark },
        success: { light: c.successLight, 200: c.success200, main: c.successMain, dark: c.successDark },

        grey: {
            50: c.grey50,
            100: c.grey100,
            500: theme.darkTextSecondary,
            600: theme.heading,
            700: theme.darkTextPrimary,
            900: theme.textDark
        },

        dark: {
            light: c.darkTextPrimary,
            main: c.darkLevel1,
            dark: c.darkLevel2,
            800: c.darkBackground,
            900: c.darkPaper
        },

        text: {
            primary: theme.darkTextPrimary,
            secondary: theme.darkTextSecondary,
            dark: theme.textDark,
            hint: c.grey100
        },

        background: {
            paper: theme.paper,
            default: theme.backgroundDefault
        }
    };
}
