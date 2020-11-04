import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';
import 'firebase/firestore';


const USER_KEY = 'users';

/* variables */
let USER_ID  = '';
let NAME = '';

/* set functions */

function set_user_info(info){
    USER_ID = info.uid;
    NAME = info.name;
}

/* async storage check and update current login user */
const update_login_user = async (data) => { 
    try {
        await AsyncStorage.setItem(USER_KEY,JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}
const check_login_user = async(func) =>{
    try{
        const result = await AsyncStorage.getItem(USER_KEY);
        if(result != null){
            set_user_info(JSON.parse(result));
            if(func != undefined){
                func();
            }
        }
    }catch(error){
        console.log(error);
    }
}



export{
    USER_ID,
    NAME,
    set_user_info,
    update_login_user,
    check_login_user,
}