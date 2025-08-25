export type ConfigProps = {
  actTheme: string;
  fontTheme: string;
  isRtl: boolean;
  apiUrl: string;
};
// @ts-ignore
export const is_development: boolean = process.env.NODE_ENV === 'development';

const config: ConfigProps = {
  actTheme: 'DarkGreenTheme',
  fontTheme: 'Roboto',
  isRtl: false,
  apiUrl: is_development ? 'http://0.0.0.0:5001' : import.meta.env.VITE_API_URL
};

export default config;
