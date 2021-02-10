import { combineReducers } from 'redux';
import { drawerReducer } from './navigation.reducer';

export const rootReducer = combineReducers({
    drawerState: drawerReducer,
})

export type RootState = ReturnType<typeof rootReducer>;