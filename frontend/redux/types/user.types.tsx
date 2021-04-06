import {
  DefaultPropertiesInterface,
  RequestInterface,
  SuccessAndFailInterface,
} from './main.types';

export interface UserInterface {
  _id?: string;
  is_employer: boolean;

  email: string;
  full_name: string;
  authorized: number;
  profile_pic: string;

  most_skilled?: string[];
  birth_day?: string;
  address?: string;
  city?: string;
  sex?: string;
  status?: string;
  documentation_links?: {name: string; path: string; file_name: string}[];
  position?: string;

  // EMPLOYER
  name_of_business?: string;
  address_of_business?: string;
  nature_of_business?: string;

  // EMPLOYEE
  nature_of_work?: string;
  token: string;
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
