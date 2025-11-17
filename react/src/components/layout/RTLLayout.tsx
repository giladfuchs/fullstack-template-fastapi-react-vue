import { ReactNode, useMemo, useEffect } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache, { StylisPlugin } from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CssBaseline, ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';
import themes from '@/assets/themes';
import { useAppSelector } from '@/lib/store';

export interface RTLLayoutProps {
    children: ReactNode;
}

const RTLLayout = ({ children }: RTLLayoutProps) => {
    const customization = useAppSelector((state) => state.customization);

    useEffect(() => {
        if (customization.rtlLayout) document?.querySelector('html')?.setAttribute('dir', 'rtl');
        else document?.querySelector('html')?.removeAttribute('dir');
    }, [customization.rtlLayout]);

    const cache = useMemo(() => {
        const c = createCache({
            key: customization.rtlLayout ? 'mui-rtl' : 'mui',
            prepend: true,
            stylisPlugins: customization.rtlLayout ? [rtlPlugin as unknown as StylisPlugin] : []
        });
        c.compat = true;
        return c;
    }, [customization.rtlLayout]);

    const baseTheme = useMemo(() => themes(customization), [customization]);
    const theme = useMemo(
        () => createTheme({ ...baseTheme, direction: customization.rtlLayout ? 'rtl' : 'ltr' }),
        [baseTheme, customization.rtlLayout]
    );

    return (
        <CacheProvider value={cache}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </StyledEngineProvider>
        </CacheProvider>
    );
};

export default RTLLayout;
