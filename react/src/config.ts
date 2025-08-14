import { PaletteMode } from '@mui/material';

export const is_development: boolean = process.env.NODE_ENV === 'development';

const config: {
    apiUrl: string;
    basename: string;
    defaultPath: string;
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    theme: PaletteMode;
    presetColor: string;
    i18n: string;
    rtlLayout: boolean;
    gridSpacing: number;
} = {
    // apiUrl: 'http://0.0.0.0:5001' ,
    apiUrl: is_development ? 'http://0.0.0.0:5001' : import.meta.env.VITE_API_URL!,
    basename: '',
    defaultPath: '/student',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    theme: 'light',
    presetColor: 'default',
    i18n: 'en',
    rtlLayout: false,
    gridSpacing: 3
};

export default config;
