import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UserInterface,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_SUCCESS,
} from '../redux/types/user.types';

const USER_KEY = 'users';

/* async storage check and update current login user */
export const update_login_user = async (data: UserInterface) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const delete_login_user = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY,);
  } catch (error) {
    console.log(error);
  }
};

export async function check_login_user() {
  try {
    // const result = await AsyncStorage.getItem(USER_KEY);
    if (result != null) {
      return JSON.parse(result);
    }
  } catch (error) {
    return null;
  }
}

