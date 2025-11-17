import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './lib/store';
import './assets/scss/style.scss';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
import config from '@/lib/utils/config';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={config.basename}>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>
);

if (typeof window !== 'undefined' && window.location.hostname.endsWith('.vercel.app')) {
    void import('@vercel/analytics').then(({ inject }) => inject());
}
