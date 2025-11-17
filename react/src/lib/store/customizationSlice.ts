import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from '@/lib/utils/config';
import { CustomizationStateProps } from '../types';
import { PaletteMode } from '@mui/material';
import { Property } from 'csstype';

const initialState: CustomizationStateProps = {
    fontFamily: config.fontFamily,
    navType: config.theme,
    presetColor: config.presetColor,
    locale: config.i18n,
    rtlLayout: config.rtlLayout
};

const customizationSlice = createSlice({
    name: 'customization',
    initialState,
    reducers: {
        setNavType(state, action: PayloadAction<PaletteMode>) {
            state.navType = action.payload;
        },
        setPresetColor(state, action: PayloadAction<string>) {
            state.presetColor = action.payload;
        },
        setLocale(state, action: PayloadAction<string>) {
            state.locale = action.payload;
        },
        setRtlLayout(state, action: PayloadAction<boolean>) {
            state.rtlLayout = action.payload;
        },
        setFontFamily(state, action: PayloadAction<Property.FontFamily>) {
            state.fontFamily = action.payload;
        }
    }
});

export const { setNavType, setPresetColor, setLocale, setRtlLayout, setFontFamily } = customizationSlice.actions;

export default customizationSlice.reducer;
