import { combineReducers } from 'redux';

import customizationReducer from './customizationReducer';
import generalReducer from './generalSlice';

const reducer = combineReducers({
    customization: customizationReducer,
    general: generalReducer
});

export default reducer;
