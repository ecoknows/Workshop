import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInterface } from '../redux/types/user.types';

const USER_KEY = 'users';

/* async storage check and update current login user */
const update_login_user = async (data : UserInterface) => { 
    try {
        await AsyncStorage.setItem(USER_KEY,JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}




const check_login_user = async() =>{
    try{
        const result = await AsyncStorage.getItem(USER_KEY);
        if(result != null){
            return JSON.parse(result);
        }
    }catch(error){
        return error;
    }
    return null;
}



export{
    update_login_user,
    check_login_user,
}