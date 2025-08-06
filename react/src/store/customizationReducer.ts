import config from 'config';

import * as actionTypes from './actions';
import { CustomizationStateProps, DefaultRootStateProps } from 'types';

export const initialState: DefaultRootStateProps['customization'] = {
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    outlinedFilled: config.outlinedFilled,
    navType: config.theme,
    presetColor: config.presetColor,
    locale: config.i18n,
    rtlLayout: config.rtlLayout
};

const customizationReducer = (state = initialState, action: CustomizationStateProps) => {
    switch (action.type) {
        case actionTypes.MENU_TYPE:
            return {
                ...state,
                navType: action.navType
            };
        case actionTypes.PRESET_COLORS:
            return {
                ...state,
                presetColor: action.presetColor
            };
        case actionTypes.THEME_LOCALE:
            return {
                ...state,
                locale: action.locale
            };
        case actionTypes.THEME_RTL:
            return {
                ...state,
                rtlLayout: action.rtlLayout
            };

        case actionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };

        default:
            return state;
    }
};

export default customizationReducer;
