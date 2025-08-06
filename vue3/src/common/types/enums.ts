export enum ModelType {
  teacher = 'teacher',
  student = 'student',
  assignment = 'assignment'
}

export enum Grade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  K = 'K',
  L = 'L'
}

export enum InputType {
  Text = 'text',
  Number = 'number',
  TextArea = 'textarea'
}

export type Teacher = {
  id: number;
  phone: number;
};

export type Assignment = {
  id: number;
  title: string;
  detail: string;
};

export type Student = {
  id: number;
  name: string;
  grade: string;
  phone: number;
  teacher_id: number;
  assignments: Assignment[];
};

export type ThemeTypes = {
  name: string;
  dark: boolean;
  variables?: object;
  colors: {
    primary?: string;
    secondary?: string;
    info?: string;
    success?: string;
    accent?: string;
    warning?: string;
    error?: string;
    lightprimary?: string;
    lightsecondary?: string;
    lightsuccess?: string;
    lighterror?: string;
    lightwarning?: string;
    darkprimary?: string;
    darksecondary?: string;
    darkText?: string;
    lightText?: string;
    borderLight?: string;
    inputBorder?: string;
    containerBg?: string;
    surface?: string;
    background?: string;
    'on-surface-variant'?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    gray100?: string;
    primary200?: string;
    secondary200?: string;
  };
};
