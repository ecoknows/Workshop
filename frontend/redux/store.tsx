import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { drawerReducer } from './reducers/navigation.reducer';
import { userSignInReducer } from './reducers/user.reducer';

const RootReducer = combineReducers({
    userSignIn: userSignInReducer,
    drawerState: drawerReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
const middleWare = applyMiddleware(thunk);
export const store = createStore(RootReducer, middleWare);
