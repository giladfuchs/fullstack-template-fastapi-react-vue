import { ReactElement } from 'react';
import { PaletteMode } from '@mui/material';
import { Property } from 'csstype';
import { Student, Teacher, Assignment } from '@/lib/types/general';

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
}
export interface GeneralStateProps {
    models: {
        teacher: Teacher[];
        student: Student[];
        assignment?: Assignment[]; // optional, unused just for TS silence
    };
    user_id: number;
    student_id: number;
    loading: boolean;
}

export interface ColorProps {
    readonly [key: string]: string;
}

export type GuardProps = {
    children: ReactElement | null;
};

export interface StringColorProps {
    id: string;
    label?: string;
    color?: string;
    primary?: string;
    secondary?: string;
}
