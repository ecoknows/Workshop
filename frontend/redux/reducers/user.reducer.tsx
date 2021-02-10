import { UserActionType,UserReducerType,  USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from '../types/user.types';

export const userSignInReducer =(state: UserReducerType = {loading : false}, action: UserActionType) : UserReducerType =>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading : true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userData: action.payload}
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}
