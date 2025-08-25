import { createTheme, type ThemeOptions, type Theme } from '@mui/material/styles';
import colors from '../scss/_themes-vars.module.scss';
import theme1 from '../scss/_theme1.module.scss';
import theme2 from '../scss/_theme2.module.scss';
import theme3 from '../scss/_theme3.module.scss';
import theme4 from '../scss/_theme4.module.scss';
import theme5 from '../scss/_theme5.module.scss';
import theme6 from '../scss/_theme6.module.scss';
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';
import customShadows from './shadows';
import type { ColorProps, CustomizationStateProps } from '@/lib/types';
import type { CustomTypography } from './types';

export const theme = (customization: CustomizationStateProps) => {
    let color: ColorProps;
    switch (customization.presetColor) {
        case 'theme1':
            color = theme1;
            break;
        case 'theme2':
            color = theme2;
            break;
        case 'theme3':
            color = theme3;
            break;
        case 'theme4':
            color = theme4;
            break;
        case 'theme5':
            color = theme5;
            break;
        case 'theme6':
            color = theme6;
            break;
        case 'default':
        default:
            color = colors;
    }

    let themeOption: CustomTypography;

    if (customization.navType === 'dark') {
        themeOption = {
            customization,
            colors: color,
            heading: color.darkTextTitle,
            textDark: color.darkTextPrimary,
            darkTextPrimary: color.darkTextPrimary,
            darkTextSecondary: color.darkTextSecondary,
            grey500: color.grey500,
            background: color.darkBackground,
            paper: color.darkLevel2,
            backgroundDefault: color.darkPaper,
            menuSelected: color.darkSecondaryMain,
            menuSelectedBack: (color.darkSecondaryMain as unknown as string) + 15,
            divider: color.darkTextPrimary
        } as unknown as CustomTypography;
    } else {
        themeOption = {
            customization,
            colors: color,
            heading: color.grey900,
            textDark: color.grey900,
            darkTextPrimary: color.grey700,
            darkTextSecondary: color.grey500,
            grey500: color.grey500,
            background: color.primaryLight,
            paper: color.paper,
            backgroundDefault: color.paper,
            menuSelected: color.secondaryDark,
            menuSelectedBack: color.secondaryLight,
            divider: color.grey200
        } as unknown as CustomTypography;
    }

    const themeOptions: ThemeOptions = {
        direction: customization.rtlLayout ? 'rtl' : 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': { minHeight: '48px' }
            }
        },
        typography: themeTypography(themeOption),
        customShadows: customShadows(customization.navType, themeOption)
    };

    const themes: Theme = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);
    return themes;
};

export default theme;
