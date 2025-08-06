import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import customizationReducer from './customizationReducer';
import generalReducer from './generalSlice';

const customizationPersistConfig = {
    key: 'customization',
    storage
};

const generalPersistConfig = {
    key: 'general',
    storage
};

const reducer = combineReducers({
    customization: persistReducer(customizationPersistConfig, customizationReducer),
    general: persistReducer(generalPersistConfig, generalReducer)
});

export default reducer;
