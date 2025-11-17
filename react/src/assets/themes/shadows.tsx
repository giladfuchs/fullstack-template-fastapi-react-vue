import type { PaletteMode } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { CustomTypography } from './types';

const createCustomShadow = (baseColor: string, colors: CustomTypography['colors']) => {
    const transparent = alpha(baseColor, 0.24);
    return {
        z1: `0 1px 2px 0 ${transparent}`,
        z8: `0 8px 16px 0 ${transparent}`,
        z12: `0 12px 24px 0 ${transparent} 0 10px 20px 0 ${transparent}`,
        z16: `0 0 3px 0 ${transparent} 0 14px 28px -5px ${transparent}`,
        z20: `0 0 3px 0 ${transparent} 0 18px 36px -5px ${transparent}`,
        z24: `0 0 6px 0 ${transparent} 0 21px 44px 0 ${transparent}`,

        primary: `0px 12px 14px 0px ${alpha(colors.primaryMain, 0.3)}`,
        secondary: `0px 12px 14px 0px ${alpha(colors.secondaryMain, 0.3)}`,
        orange: `0px 12px 14px 0px ${alpha(colors.orangeMain, 0.3)}`,
        success: `0px 12px 14px 0px ${alpha(colors.successMain, 0.3)}`,
        warning: `0px 12px 14px 0px ${alpha(colors.warningMain, 0.3)}`,
        error: `0px 12px 14px 0px ${alpha(colors.errorMain, 0.3)}`
    };
};

export default function customShadows(navType: PaletteMode, theme: CustomTypography) {
    const { colors } = theme;
    const base = navType === 'dark' ? colors.darkLevel1 : colors.grey600;
    return createCustomShadow(base, colors);
}
