import { CustomTypography } from 'themes/types';

export default function themePalette(theme: CustomTypography) {
    return {
        mode: theme?.customization?.navType!,
        common: {
            black: theme.colors?.darkPaper
        },
        primary: {
            light: theme?.customization?.navType === 'dark' ? theme.colors?.darkPrimaryLight : theme.colors?.primaryLight,
            main: theme?.customization?.navType === 'dark' ? theme.colors?.darkPrimaryMain : theme.colors?.primaryMain,
            dark: theme?.customization?.navType === 'dark' ? theme.colors?.darkPrimaryDark : theme.colors?.primaryDark,
            200: theme?.customization?.navType === 'dark' ? theme.colors?.darkPrimary200 : theme.colors?.primary200,
            800: theme?.customization?.navType === 'dark' ? theme.colors?.darkPrimary800 : theme.colors?.primary800
        },
        secondary: {
            light: theme?.customization?.navType === 'dark' ? theme.colors?.darkSecondaryLight : theme.colors?.secondaryLight,
            main: theme?.customization?.navType === 'dark' ? theme.colors?.darkSecondaryMain : theme.colors?.secondaryMain,
            dark: theme?.customization?.navType === 'dark' ? theme.colors?.darkSecondaryDark : theme.colors?.secondaryDark,
            200: theme?.customization?.navType === 'dark' ? theme.colors?.darkSecondary200 : theme.colors?.secondary200,
            800: theme?.customization?.navType === 'dark' ? theme.colors?.darkSecondary800 : theme.colors?.secondary800
        },
        error: {
            light: theme.colors?.errorLight,
            main: theme.colors?.errorMain!,
            dark: theme.colors?.errorDark
        },
        orange: {
            light: theme.colors?.orangeLight!,
            main: theme.colors?.orangeMain!,
            dark: theme.colors?.orangeDark
        },
        warning: {
            light: theme.colors?.warningLight,
            main: theme.colors?.warningMain!,
            dark: theme.colors?.warningDark!
        },
        success: {
            light: theme.colors?.successLight,
            200: theme.colors?.success200,
            main: theme.colors?.successMain,
            dark: theme.colors?.successDark
        },
        grey: {
            50: theme.colors?.grey50!,
            100: theme.colors?.grey100!,
            500: theme.darkTextSecondary!,
            600: theme.heading!,
            700: theme.darkTextPrimary!,
            900: theme.textDark!
        },
        dark: {
            light: theme.colors?.darkTextPrimary,
            main: theme.colors?.darkLevel1,
            dark: theme.colors?.darkLevel2,
            800: theme.colors?.darkBackground,
            900: theme.colors?.darkPaper
        },
        text: {
            primary: theme.darkTextPrimary!,
            secondary: theme.darkTextSecondary!,
            dark: theme.textDark!,
            hint: theme.colors?.grey100!
        },
        background: {
            paper: theme.paper!,
            default: theme.backgroundDefault!
        }
    };
}
