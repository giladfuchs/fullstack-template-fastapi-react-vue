import { ReactElement } from 'react';
import { PaletteMode } from '@mui/material';
import { Property } from 'csstype';
import { ModelState } from '../store/generalSlice';

export * from './general';
export * from './table';
export * from './form';
export * from './auth';

export interface CustomizationStateProps {
    type?: string;
    id?: string;
    navType: PaletteMode;
    presetColor: string;
    locale: string;
    rtlLayout: boolean;
    fontFamily: Property.FontFamily;
    borderRadius?: number;
    outlinedFilled: boolean;
}

export interface DefaultRootStateProps {
    customization: CustomizationStateProps;
    general: ModelState;
}

export interface ColorProps {
    readonly [key: string]: string;
}

export type GuardProps = {
    children: ReactElement | null;
};
export type KeyedObject = {
    [key: string]: string | number | KeyedObject | unknown;
};

export interface StringColorProps {
    id: string;
    label?: string;
    color?: string;
    primary?: string;
    secondary?: string;
}
