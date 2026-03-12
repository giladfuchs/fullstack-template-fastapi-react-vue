export * from './enums';
export * from './form';
export * from './table';

export interface DBQuery {
  opt: string;
  key: string;
  value: string | number;
}

export type FilterQuery = {
  query?: DBQuery[];
  count?: boolean;
  or_query?: DBQuery[];

  // Sort string format: "field:asc" or "field:desc".
  // Multiple sorts can be applied by separating with commas.
  // Example: "created_at:desc,name:asc"
  sort?: string | null;

  // Relations
  relation_model?: boolean;
  relations?: string[] | null;
};

export interface LoginToken {
  token: string;
  id: number;
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
