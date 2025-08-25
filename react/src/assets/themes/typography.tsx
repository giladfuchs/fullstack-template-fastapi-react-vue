import type { ThemeOptions } from '@mui/material/styles';
import type { CSSObject } from '@emotion/react';
import type { CustomTypography } from './types';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        customInput: CSSObject;
        mainContent: CSSObject;
    }
    interface TypographyVariantsOptions {
        customInput: CSSObject;
        mainContent: CSSObject;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        customInput: true;
        mainContent: true;
    }
}

export type TypographyOptions = NonNullable<ThemeOptions['typography']>;

export default function themeTypography(theme: CustomTypography): TypographyOptions {
    return {
        fontFamily: theme.customization.fontFamily,
        h6: { fontWeight: 500, color: theme.heading, fontSize: '0.75rem' },
        h5: { fontSize: '0.875rem', color: theme.heading, fontWeight: 500 },
        h4: { fontSize: '1rem', color: theme.heading, fontWeight: 600 },
        h3: { fontSize: '1.25rem', color: theme.heading, fontWeight: 600 },
        h2: { fontSize: '1.5rem', color: theme.heading, fontWeight: 700 },
        h1: { fontSize: '2.125rem', color: theme.heading, fontWeight: 700 },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: theme.customization.navType === 'dark' ? theme.heading : theme.textDark
        },
        subtitle2: { fontSize: '0.75rem', fontWeight: 400, color: theme.darkTextSecondary },
        caption: { fontSize: '0.75rem', color: theme.darkTextSecondary, fontWeight: 400 },
        body1: { fontSize: '0.875rem', fontWeight: 400, lineHeight: '1.334em' },
        body2: { letterSpacing: '0em', fontWeight: 400, lineHeight: '1.5em', color: theme.darkTextPrimary },
        button: { textTransform: 'capitalize' },
        customInput: {
            marginTop: 1,
            marginBottom: 1,
            '& > label': {
                top: 23,
                left: 0,
                color: theme.grey500,
                '&[data-shrink="false"]': { top: 5 }
            },
            '& > div > input': { padding: '30.5px 14px 11.5px !important' },
            '& legend': { display: 'none' },
            '& fieldset': { top: 0 }
        },
        mainContent: {
            backgroundColor: theme.background,
            width: '100%',
            minHeight: 'calc(100vh - 88px)',
            flexGrow: 1,
            padding: '20px',
            marginTop: '88px',
            marginRight: '20px',
            borderRadius: '0.7rem'
        }
    };
}
