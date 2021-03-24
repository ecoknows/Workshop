import {
  DefaultPropertiesInterface,
  RequestInterface,
  SuccessAndFailInterface,
} from './main.types';

export interface UserInterface {
  _id: string;
  is_employer: boolean;

  email: string;

  firstname: string;
  lastname: string;

  authorized: number;

  location: string;
}

export interface UserSignInInterface {
  email: string;
  password: string;
}

export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST';
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_FAIL = 'USER_SIGNIN_FAIL';
export const USER_SIGNOUT = 'USER_SIGNOUT';

interface UserSuccessType extends DefaultPropertiesInterface {
  userData?: UserInterface | UserSignInInterface | null | object;
}

export type UserReducerType = UserSuccessType;
export type UserActionType =
  | RequestInterface<typeof USER_SIGNIN_REQUEST>
  | RequestInterface<typeof USER_SIGNOUT>
  | SuccessAndFailInterface<
      typeof USER_SIGNIN_SUCCESS | typeof USER_SIGNIN_FAIL,
      UserInterface
    >;
