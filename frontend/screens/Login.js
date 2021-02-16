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
import { AntDesign as Icon} from '@expo/vector-icons';
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
      <Image source={require('../assets/Login.png')} style={styles.image} resizeMode="contain"/>
      <KeyboardAvoidingView  behavior="position" style={styles.form} keyboardVerticalOffset={-90}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='email@email.com'
          placeholderTextColor='#dfe6e9'  
          returnKeyType='next'
          onChangeText={ text=>setEmail(text)}
          value={email}
        />

        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder='**********'
          placeholderTextColor='#dfe6e9'
          returnKeyType='done'
          secureTextEntry={Hide}
          onChangeText={ text=>setPassword(text)}
          value={password}
        
        />
          
        <TouchableOpacity style={styles.eyeBtn} onPress={ () => setHide(!Hide) }>
          <Icon name={Hide === false ? 'eye' : 'eyeo' } size={30} color='#f68025'/>
        </TouchableOpacity>   

        <TouchableOpacity style={styles.loginBtn} onPress={()=> dispatch(signin(email,password)) }>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableWithoutFeedback>
           <Text style={{color: '#f68025', fontWeight: 'bold', alignSelf: 'center', marginTop: 10}}>Forgot Password</Text>
        </TouchableWithoutFeedback>
       
      </KeyboardAvoidingView>

      <Text style={{
        color: '#003A63', 
        alignSelf: 'center', 
        marginTop: 40
        }}>▬▬▬▬▬▬▬▬  Sign Up with  ▬▬▬▬▬▬▬▬
      </Text>

      <View style={styles.socIcon}>
        <TouchableOpacity>
          <Icon name='facebook-square' size={28} color='#4267B2'/>
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon name='google' size={28} color='#DB4437'/>
        </TouchableOpacity>

      </View>
      
     
    </View>
  </TouchableWithoutFeedback>
    
    
  );
}


// function SignInButtonClick (email, pass, navigation,dispatch){
//   dispatch(signin(email,pass))
//   // sign_in(email,pass, ()=>{
//   //   Keyboard.dismiss();
//   //   get_user(current_user_id());
//   //   navigation.navigate('UserScreen');
//   // });
// }

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
    width: 355,
    height: 269,
  },
  form:{
    marginHorizontal: 20,
  },
  text:{
    color: '#f68025',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 5,
  },
  input:{
    borderBottomColor: "#f68025", 
    borderBottomWidth: 2, 
    borderStyle: 'solid', 
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  eyeBtn: {
    alignSelf: 'flex-end',
    position: "absolute",
    top: 125,
    
  },  
  loginBtn: {
    borderColor: '#f68025',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 30,
    marginTop: 10,
    alignSelf: 'center'
  },
  loginText:{
    color: '#f68025',
    fontSize: 20,
    fontWeight: 'bold',
  },
  socIcon: {
    flexDirection: 'row',  
    justifyContent: 'space-evenly', 
  alignSelf: 'center', 
  marginTop: 15, 
  width: 125 
  },
});
