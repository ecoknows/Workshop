import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { drawerReducer } from './reducers/navigation.reducer';
import { userSignInReducer } from './reducers/user.reducer';

const RootReducer = combineReducers({
    userSignIn: userSignInReducer,
    drawerState: drawerReducer,
});


const middleWare = applyMiddleware(thunk);
export const store = createStore(RootReducer, middleWare);
