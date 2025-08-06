import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from 'serviceWorker';
import App from 'App';
import store from 'store';

import 'assets/scss/style.scss';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import config from 'config';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
