import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { userSignInReducer } from './reducers/user.reducer';

const RootReducer = combineReducers({
    userSignIn: userSignInReducer
});


const middleWare = applyMiddleware(thunk);
export const store = createStore(RootReducer, middleWare);
