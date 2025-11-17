import { configureStore, combineReducers, type Reducer } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import customizationReducer from './customizationSlice';
import generalReducer from './generalSlice';

export * from './generalSlice';
export * from './customizationSlice';
export { default as generalReducer } from './generalSlice';
export { default as customizationReducer } from './customizationSlice';

const rootReducer = combineReducers({
    customization: customizationReducer,
    general: generalReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState>(
    {
        key: 'root',
        storage,
        whitelist: ['customization', 'general']
    },
    rootReducer as Reducer<RootState>
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (gDM) => gDM({ serializableCheck: false })
});

void persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
