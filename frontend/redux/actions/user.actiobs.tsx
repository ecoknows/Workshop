import Axios from "axios";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../types/user.types"

export const signin = (email : string, password : string)=> async(dispatch : any)=>{
    dispatch({type: USER_SIGNIN_REQUEST, payload:{ email, password}});
    
    
    try{
        const { data } = await Axios.post('/login',{email, password})
        console.log('pogi');
        dispatch({type: USER_SIGNIN_SUCCESS, payload:data});
    }catch(error){
        dispatch({type: USER_SIGNIN_FAIL, payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,});
    }
}