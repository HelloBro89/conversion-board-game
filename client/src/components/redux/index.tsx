import { combineReducers } from 'redux';
import appDataReducer from './reducers/appDataReducer';
// import articlesReducer from './articlesReducer.jsx';

export const rootReducer = combineReducers({
    appData: appDataReducer,
    // articles: articlesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
