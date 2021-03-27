import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard } from 'react-native';

import {AntDesign, Fontisto} from '@expo/vector-icons';
import { current_user_id, get_user, sign_in } from '../database/firebase';
import { update_login_user } from '../database/current_user';
import {useSelector, useDispatch} from 'react-redux';
import { signin } from '../redux/actions';
import { red } from 'react-native-redash/lib/module/v1';
import { theme } from '../constants';

function Main({navigation}) {
  const[Hide,setHide] = useState(true);
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');


  const UserState = useSelector((state)=> state.userDetails);
  const dispatch = useDispatch();
  const { loading, userData, error } = UserState;
  useEffect(() => {
    if (userData) {
      navigation.replace('UserScreen');
    }
    if (error) {
      console.log(error);
    }
  }, [userData, error]);

  return (
    <ScrollView style={styles.container}>
      <View paddingHorizontal={20} height={theme.height}>
            <View flex={1} >
              <Text style={{fontWeight:'bold',fontSize: 38, marginLeft: 20, marginTop: 20, color:'#4f4f4f' }}>Login</Text>
              <Image source={require('../assets/image/Profile.png')} style={styles.image} resizeMode="contain"/>
            </View>

            <View justifyContent='center' >
              <TextInput
                style={styles.input}
                placeholder='EMAIL ADDRESS'
                placeholderTextColor='#808080'  
                returnKeyType='next'
                onChangeText={ text=>setEmail(text)}
                value={email}
              />

              <View style={styles.input}>
                <TextInput
                  style={{fontSize: 18,flex: 1}}
                  placeholder='**********'
                  placeholderTextColor='#808080'
                  returnKeyType='done'
                  secureTextEntry={Hide}
                  onChangeText={ text=>setPassword(text)}
                  value={password}
                />
                <TouchableOpacity onPress={ () => setHide(!Hide) }>
                  <AntDesign name={Hide === false ? 'eye' : 'eyeo' } size={30} color='#f68025'/>
                </TouchableOpacity> 
              </View>

            </View>
              
            <View flex={1} justifyContent='center' alignItems='center' >
              <View flex={1} justifyContent='flex-end'>
                <TouchableOpacity style={styles.loginBtn} onPress={()=> dispatch(signin(email,password)) }>
                  <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
              </View>
              <View flex={1} justifyContent='center'>
                <Text style={{color: '#808080', fontWeight: 'bold'}}>Haven't made an account yet? 
                  <TouchableWithoutFeedback onPress={()=>navigation.navigate('SignUp')}>
                    <Text style={{color: '#f68025', fontWeight: 'bold'}}>Sign Up</Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
      </View>
        
  </ScrollView>
    
    
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  image:{
    marginTop: 20,
    alignSelf: 'center',
    width: 137,
    height: 137,
  },
  form: {
    marginHorizontal: 20,
    marginTop: 50
  },
  text: {
    color: '#f68025',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 5,
  },
  input:{
    borderBottomWidth: 1, 
    borderStyle: 'solid', 
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  loginBtn: {
    borderColor: '#f68025',
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 50,
    alignSelf: 'center'
  },
  loginText: {
    color: '#f68025',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
