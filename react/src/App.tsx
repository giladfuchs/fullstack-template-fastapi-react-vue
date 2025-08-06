import { useSelector } from 'react-redux';
import { Toaster } from 'sonner';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import Routes from 'routes';
import { DefaultRootStateProps } from 'types';
import themes from 'themes';
import Locales from 'ui-component/layout/Locales';
import { AuthProvider } from 'contexts/UseAuth';
import AxiosInterceptor from './contexts/AxiosInterceptor';
import Loader from './ui-component/layout/Loader';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

const App = () => {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);
    const { loading } = useSelector((state: DefaultRootStateProps) => state.general);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <Toaster richColors closeButton position="bottom-center" />
                <Locales>
                    <AuthProvider>
                        <AxiosInterceptor>
                            {loading && <Loader />}
                            <Routes />
                        </AxiosInterceptor>
                    </AuthProvider>
                </Locales>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
