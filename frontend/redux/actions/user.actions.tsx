import Axios from "axios";
import { check_login_user } from "../../database/current_user";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../types/user.types"

export const signin = (email : string, password : string)=> async(dispatch : any)=>{
    dispatch({type: USER_SIGNIN_REQUEST});
    try{
        const { data } = await Axios.post('/login',{email, password})
        dispatch({type: USER_SIGNIN_SUCCESS, payload:data});
    }catch(error){
        dispatch({type: USER_SIGNIN_FAIL, payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,});
    }
}

export const checkUser = ()=> async(dispatch : any)=>{
    dispatch({type: USER_SIGNIN_REQUEST});
    try{
        const data = await check_login_user();
        dispatch({type: USER_SIGNIN_SUCCESS, payload:data});
    }catch(error){
        dispatch({type: USER_SIGNIN_FAIL, payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,});
    }
}
