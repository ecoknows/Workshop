import {
  UserActionType,
  UserReducerType,

  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,

  USER_SIGNOUT,
} from '../types/user.types';

const getUserData = (item: any) => {
  return JSON.parse(item);
};

const initialState: UserReducerType = {
  loading: false,
  userData: null,
  error: false,
};

export const userSignInReducer = (
  state: UserReducerType = initialState,
  action: UserActionType
): UserReducerType => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userData: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
  
};
