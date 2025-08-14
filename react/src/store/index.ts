import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import customizationReducer from './customizationReducer';
import generalReducer from './generalSlice';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
    customization: customizationReducer,
    general: generalReducer
});

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage,
        whitelist: ['customization', 'general']
    },
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer
});

persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
