import Axios from 'axios';
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from '../types/user.types';
import {
  update_login_user,
  check_login_user,
  delete_login_user,
} from '../../database/current_user';


export const update_tag = (most_skilled: (string | number)[]) => async (
  dispatch: any,
  getState: any,
) =>{
  const {
    userDetails: {
      userData,
    }
  } = getState();
  try{
    if(most_skilled){  
      const { data } = await Axios.put(`/user/${userData._id}/tag`, {most_skilled});
      if(data){
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        update_login_user(data);
      }
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

export const signin = (email: string, password: string, navigation: any) => async (
  dispatch: any,
) => {

  try {
    const { data } = await Axios.post('/user/login', { email, password });
    if(data){
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
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

export const verify = (info: any, status: string, documents: {name: string, file: object}[]) => async (
  dispatch: any,
  getState: any,
) => {
  const {
    userDetails: {userData}
  }= getState();
  

  if(status == 'Employer'){
    if(
      !info.name_of_business || !info.address_of_business || !info.nature_of_business || !info.position
    ){
      return;
    }
  }

  if( status == 'Employee'){
    if(
      !info.nature_of_work || !info.position
    ){
      return;
    }
  }

  
  if(status == 'Account'){
    if(
      info.sex && info.birth_day && info.address && info.city && info.status
    ){
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: {...userData,...info} });
    }
    return;
  }





  try {

    const filteredDocuments = documents.filter(docu => docu.file !== null);
    
    if(filteredDocuments.length > 0){

      const formData = new FormData();
      filteredDocuments.forEach((item: any) => {
        formData.append('files[]',{
          name: item.file.name,
          type: item.file.type,
          uri: item.file.uri,
        });
      })

      console.log("formData: ",formData);
      
      const Documents = await Axios.post('/uploads/documents',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if(Documents.data){
        console.log(Documents.data, 'success?');
        
      }
    }

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
export const register = (name: string, email: string, password: string, confirm_password: string, profile_pic: string) => async (
  dispatch: any
) => {
  if(password != confirm_password){
    dispatch({type: USER_SIGNIN_FAIL, payload: "Password doesn't match"});
    return;
  }

  try {
    const { data } = await Axios.post('/user/register', { full_name: name, email, password, profile_pic });
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
