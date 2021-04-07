import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import {Pic, Input} from '../components';
import {
  AccountDetails,
  AccountStatusEmployee,
  AccountStatusEmployer,
} from './AccountDetails';
import {useSelector, useDispatch} from 'react-redux';
import {register} from '../redux';
import {delete_login_user} from '../database/current_user';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import Toast from 'react-native-toast-message';

function Main({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [accountStatus, setStatus] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const dispatch = useDispatch();
  const UserState = useSelector(state => state.userDetails);

  const {userData, error} = UserState;
  useEffect(() => {
    if (userData) {
      if (userData.is_employer) {
        if (
          userData.birth_day &&
          userData.address &&
          userData.city &&
          userData.sex &&
          userData.name_of_business &&
          userData.address_of_business &&
          userData.nature_of_business &&
          userData.position
        ) {
          navigation.replace('UserScreen');
        }
      } else {
        if (
          userData.birth_day &&
          userData.address &&
          userData.city &&
          userData.sex &&
          userData.nature_of_work
        ) {
          navigation.replace('UserScreen');
        }
      }

      if (
        accountStatus == '' &&
        (!userData.birth_day ||
          !userData.address ||
          !userData.city ||
          !userData.sex ||
          !userData.status)
      ) {
        setStatus('Account');
      } else if (
        accountStatus == 'Account' &&
        (!userData.name_of_business ||
          !userData.address_of_business ||
          !userData.nature_of_business ||
          !userData.position)
      ) {
        setStatus(userData.status);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: error,
        text2: 'Please try again 🥺',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  }, [error]);

  async function UploadImage() {
    const formData = new FormData();
    formData.append('image', {
      name: 'deymsan',
      type: profilePic.mime,
      uri: profilePic.path,
    });

    try {
      const {data} = await Axios.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data) {
        dispatch(register(name, email, password, confirm_password, data));
      }
    } catch (error) {}
  }

  const verfyingInputs = () => {
    if (profilePic != null) {
      UploadImage();
    } else {
      dispatch(register(name, email, password, confirm_password, null));
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 38,
            marginLeft: 20,
            marginTop: 20,
            color: '#4f4f4f',
          }}>
          Sign Up
        </Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.image}
            onPress={() => {
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                setProfilePic(image);
              });
            }}>
            <Pic
              src={
                profilePic
                  ? {uri: profilePic.path}
                  : require('../assets/image/user/man.png')
              }
              profile_picture
              edit
            />
          </TouchableOpacity>
        </View>

        <View style={{padding: 5}}>
          <Input
            placeholder="FULL NAME"
            placeholderTextColor="#808080"
            returnKeyType="next"
            style={{width: '100%'}}
            onChangeText={text => setName(text)}
            value={name}
            icon={require('../assets/icons/sign_up/user.png')}
          />
          <Input
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder={'EMAIL ADDRESS'}
            placeholderTextColor="#808080"
            returnKeyType="next"
            icon={require('../assets/icons/sign_up/mail.png')}
          />

          <Input
            placeholder="**********"
            placeholderTextColor="#808080"
            returnKeyType="done"
            password
            style={{width: '100%'}}
            onChangeText={text => setPassword(text)}
            value={password}
            icon={require('../assets/icons/sign_up/password.png')}
          />

          <Input
            placeholder="**********"
            placeholderTextColor="#808080"
            style={{width: '100%'}}
            returnKeyType="done"
            password
            onChangeText={text => setConfirmPassword(text)}
            value={confirm_password}
            icon={require('../assets/icons/sign_up/password.png')}
          />

          <TouchableOpacity style={styles.SignupBtn} onPress={verfyingInputs}>
            <Text style={styles.SignupText}>Signup</Text>
          </TouchableOpacity>

          <Text
            style={{color: '#808080', fontWeight: 'bold', alignSelf: 'center'}}>
            Already Have an Account?
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#f68025', fontWeight: 'bold'}}>
                {' '}
                Log In
              </Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>

        <AccountDetails accountStatus={accountStatus} />
        <AccountStatusEmployer
          accountStatus={accountStatus}
          setStatus={setStatus}
        />
        <AccountStatusEmployee
          accountStatus={accountStatus}
          setStatus={setStatus}
        />
      </View>
    </ScrollView>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
  },
  form: {
    marginHorizontal: 15,
  },
  text: {
    color: '#f68025',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginBottom: 30,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  eyeBtn: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 150,
    left: 275,
  },
  SignupBtn: {
    borderColor: '#f68025',
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  SignupText: {
    color: '#f68025',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
