import '@mui/material/styles';
import '@mui/material/Typography';
import type * as React from 'react';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        customInput: React.CSSProperties;
        mainContent: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        customInput: React.CSSProperties;
        mainContent: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        customInput: true;
        mainContent: true;
    }
}
