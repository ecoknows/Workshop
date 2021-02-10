export interface UserInterface {
    _id: string,
    email: string,
    firstname: string,
    lastname: string,
    loading: boolean,
}

export interface UserSignInInterface{
    email: string,
    password: string,
}

export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST';
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_FAIL = 'USER_SIGNIN_FAIL';

interface UserSignInRequest {
    type: typeof USER_SIGNIN_REQUEST,
    payload: boolean,
}

interface UserSignIn{
    type: typeof USER_SIGNIN_SUCCESS | typeof USER_SIGNIN_FAIL,
    payload: UserInterface,
}

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
interface UserSuccessType{
    loading : boolean,
    userData : UserInterface | UserSignInInterface 
}
interface UserRequestType{
    loading : boolean,
}
interface UserFailType{
    loading : boolean,
    error : any
}

export type UserReducerType = UserSuccessType | UserRequestType | UserFailType;
export type UserActionType = UserSignInRequest | UserSignIn;
