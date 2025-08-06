export type ConfigProps = {
  Sidebar_drawer: any;
  Customizer_drawer: boolean;
  mini_sidebar: boolean;
  setHorizontalLayout: boolean;
  actTheme: string;
  fontTheme: string;
  inputBg: boolean;
  boxed: boolean;
  apiUrl: string;
};
// @ts-ignore
export const is_development: boolean = process.env.NODE_ENV === 'development';

const config: ConfigProps = {
  Sidebar_drawer: null,
  Customizer_drawer: false,
  mini_sidebar: false,
  setHorizontalLayout: false,
  actTheme: 'DarkGreenTheme',
  fontTheme: 'Roboto',
  inputBg: false,
  apiUrl: is_development ? 'http://0.0.0.0:5001' : import.meta.env.VITE_API_URL,
  boxed: false
};

export default config;
