import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  bottomDrawerReducer,
  drawerReducer,
} from './reducers/navigation.reducer';
import { userSignInReducer,userRegisterReducer } from './reducers/user.reducer';
import { jobsListReducer, jobCreateReducer,jobsSelectReducer } from './reducers/jobs.reducer';

const RootReducer = combineReducers({
  userDetails: userSignInReducer,
  userRegisterState: userRegisterReducer,

  drawerState: drawerReducer,
  bottomDrawerState: bottomDrawerReducer,
  jobsListState: jobsListReducer,
  jobCreateState: jobCreateReducer,
  jobsSelectedState: jobsSelectReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
const middleWare = applyMiddleware(thunk);
export const store = createStore(RootReducer, middleWare);
