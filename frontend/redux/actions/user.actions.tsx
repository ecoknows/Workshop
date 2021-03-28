import Axios from 'axios';
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from '../types/user.types';
import {
  update_login_user,
  check_login_user,
  delete_login_user,
} from '../../database/current_user';

export const signin = (email: string, password: string) => async (
  dispatch: any,
) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await Axios.post('/user/login', { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    update_login_user(data);
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verify = (info, status) => async (
  dispatch: any,
  getState: any,
) => {
  const {
    userDetails: {userData}
  }= getState();

  if(status == 'Account'){
    if(
      info.sex != '' || info.birth_day != '' || info.address != '' || info.city != ''
    ){
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: {...userData,...info} });
    }else{
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload: "Input ar empty please try again "
      });
    }
    return;
  }
  
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await Axios.post(`/user/register/account?email=${userData.email}`, {
      ...userData,
      ...info
    });
    if(data){
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data});
      update_login_user(data);
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const register = (name: string, email: string, password: string, confirm_password: string) => async (
  dispatch: any
) => {
  if(password != confirm_password){
    dispatch({type: USER_SIGNIN_REQUEST, payload: "Password doesn't match"});
    return;
  }
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await Axios.post('/user/register', { full_name: name, email, password, });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch: any) => {
  delete_login_user();
  dispatch({type: USER_SIGNOUT});
}

export const checkUser = () => async (dispatch: any) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const data = await check_login_user();
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
