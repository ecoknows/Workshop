import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import { StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  KeyboardAvoidingView,
  Keyboard } from 'react-native';

import {AntDesign, Fontisto} from '@expo/vector-icons';
import { current_user_id, get_user, sign_in } from '../database/firebase';
import { update_login_user } from '../database/current_user';
import {useSelector, useDispatch} from 'react-redux';
import { signin } from '../redux/actions';

function Main({navigation}) {
  const[Hide,setHide] = useState(true);
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');


  const UserState = useSelector((state)=> state.userDetails);
  const dispatch = useDispatch();
  const { loading, userData, error } = UserState;

  useEffect(() => {
    if(userData){
      Keyboard.dismiss();
      update_login_user(userData);
      navigation.navigate('UserScreen');
    }
    if(error){
      console.log(error);
    }
  }, [userData, error]);


  return (

  <TouchableWithoutFeedback onPress={() => {
    Keyboard.dismiss();
    }}>
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize: 38, marginLeft: 20, marginTop: 20, color:'#4f4f4f' }}>Login</Text>
      <Image source={require('../assets/image/Profile.png')} style={styles.image} resizeMode="contain"/>
      <KeyboardAvoidingView  behavior="position" style={styles.form} keyboardVerticalOffset={-90}>

        <View>

          
          <TextInput
            style={styles.input}
            placeholder='EMAIL ADDRESS'
            placeholderTextColor='#808080'  
            returnKeyType='next'
            onChangeText={ text=>setEmail(text)}
            value={email}
          />
        </View>

        <View>
          
          <TextInput
            style={styles.input}
            placeholder='**********'
            placeholderTextColor='#808080'
            returnKeyType='done'
            secureTextEntry={Hide}
            onChangeText={ text=>setPassword(text)}
            value={password}
          />

          <TouchableOpacity style={styles.eyeBtn} onPress={ () => setHide(!Hide) }>
            <AntDesign name={Hide === false ? 'eye' : 'eyeo' } size={30} color='#f68025'/>
          </TouchableOpacity> 
        </View>
          
        <TouchableOpacity style={styles.loginBtn} onPress={()=> dispatch(signin(email,password)) }>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={{color: '#808080', fontWeight: 'bold', alignSelf: 'center', top: 150}}>Haven't made an account yet? 
          <TouchableWithoutFeedback>
            <Text style={{color: '#f68025', fontWeight: 'bold'}}>Sign Up</Text>
          </TouchableWithoutFeedback>
        </Text>
        
       
      </KeyboardAvoidingView>

      
    
     
    </View>
  </TouchableWithoutFeedback>
    
    
  );
}


export default Main;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal:10,
    backgroundColor: '#fff'
  },
  image:{
    marginTop: 20,
    alignSelf: 'center',
    width: 137,
    height: 137,
  },
  form:{
    marginHorizontal: 20,
    marginTop: 50
  },
  text:{
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
    fontSize: 18,
  },
  eyeBtn: {
    alignSelf: 'flex-end',
    position: "absolute",
    top: 10,
    
  },  
  loginBtn: {
    borderColor: '#f68025',
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 50,
    top:90,
    alignSelf: 'center'
  },
  loginText:{
    color: '#f68025',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
