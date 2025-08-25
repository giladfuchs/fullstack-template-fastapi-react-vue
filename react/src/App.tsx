import { Toaster } from 'sonner';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import Routes from './lib/routes';
import themes from '@/assets/themes';
import Locales from '@/components/layout/Locales';
import { Loader } from '@/components/layout/Loadable';
import RTLLayout from '@/components/layout/RTLLayout';
import { AuthProvider } from '@/lib/contexts/UseAuth';
import AxiosInterceptor from '@/lib/contexts/AxiosInterceptor';
import { useAppSelector } from '@/lib/store';

const App = () => {
    const customization = useAppSelector((state) => state.customization);
    const { loading } = useAppSelector((state) => state.general);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <RTLLayout>
                    <Toaster richColors closeButton position="bottom-center" />
                    <Locales>
                        <AuthProvider>
                            <AxiosInterceptor>
                                {loading && <Loader />}
                                <Routes />
                            </AxiosInterceptor>
                        </AuthProvider>
                    </Locales>
                </RTLLayout>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
