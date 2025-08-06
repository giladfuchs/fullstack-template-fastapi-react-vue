import { createTheme, ThemeOptions, Theme } from '@mui/material/styles';

import colors from 'assets/scss/_themes-vars.module.scss';
import theme1 from 'assets/scss/_theme1.module.scss';
import theme2 from 'assets/scss/_theme2.module.scss';
import theme3 from 'assets/scss/_theme3.module.scss';
import theme4 from 'assets/scss/_theme4.module.scss';
import theme5 from 'assets/scss/_theme5.module.scss';
import theme6 from 'assets/scss/_theme6.module.scss';

import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';
import customShadows from './shadows';
import { ColorProps, CustomizationStateProps } from 'types';

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

    const themeOption = {
        colors: color,
        heading: '',
        paper: '',
        backgroundDefault: '',
        background: '',
        darkTextPrimary: '',
        darkTextSecondary: '',
        textDark: '',
        menuSelected: '',
        menuSelectedBack: '',
        divider: '',
        customization
    };

    switch (customization.navType) {
        case 'dark':
            themeOption.paper = color.darkLevel2;
            themeOption.backgroundDefault = color.darkPaper;
            themeOption.background = color.darkBackground;
            themeOption.darkTextPrimary = color.darkTextPrimary;
            themeOption.darkTextSecondary = color.darkTextSecondary;
            themeOption.textDark = color.darkTextPrimary;
            themeOption.menuSelected = color.darkSecondaryMain;
            themeOption.menuSelectedBack = color.darkSecondaryMain + 15;
            themeOption.divider = color.darkTextPrimary;
            themeOption.heading = color.darkTextTitle;
            break;
        case 'light':
        default:
            themeOption.paper = color.paper;
            themeOption.backgroundDefault = color.paper;
            themeOption.background = color.primaryLight;
            themeOption.darkTextPrimary = color.grey700;
            themeOption.darkTextSecondary = color.grey500;
            themeOption.textDark = color.grey900;
            themeOption.menuSelected = color.secondaryDark;
            themeOption.menuSelectedBack = color.secondaryLight;
            themeOption.divider = color.grey200;
            themeOption.heading = color.grey900;
            break;
    }

    const themeOptions: ThemeOptions = {
        direction: customization.rtlLayout ? 'rtl' : 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
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
