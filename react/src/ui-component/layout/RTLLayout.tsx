import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import createCache, { StylisPlugin } from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CssBaseline, ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';
import themes from '../../themes'; // your existing theme factory
import { DefaultRootStateProps } from '../../types';

export interface RTLLayoutProps {
    children: ReactNode;
}

const RTLLayout = ({ children }: RTLLayoutProps) => {
    const customization = useSelector((s: DefaultRootStateProps) => s.customization);
    const isRtl = !!customization.rtlLayout;

    if (isRtl) document?.querySelector('html')?.setAttribute('dir', 'rtl');
    else document?.querySelector('html')?.removeAttribute('dir');

    const cache = useMemo(() => {
        const c = createCache({
            key: isRtl ? 'mui-rtl' : 'mui',
            prepend: true,
            stylisPlugins: isRtl ? [rtlPlugin as unknown as StylisPlugin] : []
        });
        c.compat = true;
        return c;
    }, [isRtl]);

    const baseTheme = useMemo(() => themes(customization), [customization]);
    const theme = useMemo(() => createTheme({ ...baseTheme, direction: isRtl ? 'rtl' : 'ltr' }), [baseTheme, isRtl]);

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
