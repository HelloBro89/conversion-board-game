import { combineReducers } from "redux";
import nickNameReducer from './reducers/nickNameReducer'
// import articlesReducer from './articlesReducer.jsx';

export const rootReducer = combineReducers({
    nickName: nickNameReducer,
    // articles: articlesReducer
})

export type RootState = ReturnType<typeof rootReducer>
