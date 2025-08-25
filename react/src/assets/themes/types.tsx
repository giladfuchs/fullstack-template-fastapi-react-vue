import type { CSSObject } from '@emotion/react';
import { PaletteMode } from '@mui/material';
import { Property } from 'csstype';
import { ColorProps } from '@/lib/types';

export interface CustomizationProps {
    fontFamily: Property.FontFamily;
    borderRadius?: number;
    navType: PaletteMode;
    presetColor?: string;
    rtlLayout?: boolean;
}

export interface CustomTypography {
    customization: CustomizationProps;
    colors: ColorProps;
    heading: string;
    textDark: string;
    darkTextPrimary: string;
    darkTextSecondary: string;
    grey500: string;
    background: string;
    paper: string;
    backgroundDefault: string;
    menuSelected: string;
    menuSelectedBack: string;
    divider: string;

    customInput: CSSObject;
    mainContent: CSSObject;

    grey900?: string;
    grey800?: string;
    grey700?: string;
    grey600?: string;
    grey400?: string;
    grey300?: string;
    grey200?: string;
    grey100?: string;
    grey50?: string;

    secondaryLight?: string;
    secondary200?: string;
    secondaryDark?: string;
    secondaryMain?: string;

    darkPrimaryLight?: string;
    darkPrimaryMain?: string;
    darkPrimaryDark?: string;

    darkSecondaryMain?: string;
    darkSecondaryLight?: string;
    darkSecondary800?: string;
    darkSecondary200?: string;
    darkSecondaryDark?: string;

    secondary800?: string;
    darkPrimary800?: string;
    darkPrimary200?: string;

    darkLevel2?: string;
    darkLevel1?: string;
    darkPaper?: string;
    darkBackground?: string;

    primaryDark?: string;
    primary800?: string;
    primary200?: string;
    primaryLight?: string;
    primaryMain?: string;

    z1?: string;
    z8?: string;
    z12?: string;
    z16?: string;
    z20?: string;
    z24?: string;

    primary?: string;
    secondary?: string;

    orange?: string;
    orangeLight?: string;
    orangeMain?: string;
    orangeDark?: string;

    successLight?: string;
    success200?: string;
    successMain?: string;
    successDark?: string;
    success?: string;

    warning?: string;
    error?: string;
    errorLight?: string;
    errorMain?: string;
    errorDark?: string;

    warningLight?: string;
    warningMain?: string;
    warningDark?: string;
}
