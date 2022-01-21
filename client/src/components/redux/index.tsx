import { combineReducers } from 'redux';
import appDataReducer from './reducers/appDataReducer';
import socketsDataReducer from './reducers/socketsDataReducer';

export const rootReducer = combineReducers({
    appData: appDataReducer,
    socketsData: socketsDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
