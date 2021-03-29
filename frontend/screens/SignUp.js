
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  ScrollView,
  KeyboardAvoidingView,
  Keyboard } from 'react-native';
import { AntDesign as Icon} from '@expo/vector-icons';
import {AccountDetails, AccountStatusEmployee, AccountStatusEmployer} from './AccountDetails';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../redux';
import { delete_login_user } from '../database/current_user';



function Main({navigation}) {  
  const[Hide,setHide] = useState(true);
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[confirm_password,setConfirmPassword] = useState('');
  const [accountStatus, setStatus] = useState('');
  
  const dispatch = useDispatch();
  const UserState = useSelector(state => state.userDetails);

  const { userData, error } = UserState;

  console.log("SignUp: " ,userData);
  useEffect(() => {
    if (userData) {
      if(userData.is_employer){
        if (
          userData.birth_day && userData.address && userData.city && userData.sex && userData.name_of_business && userData.address_of_business && userData.nature_of_business && userData.position
        ) {
          navigation.replace('UserScreen');
        }
      }else{
        if (
          userData.birth_day && userData.address && userData.city && userData.sex && userData.nature_of_work
        ) {
          navigation.replace('UserScreen');
        }
      }

      
      if ( accountStatus ==  '' && (!userData.birth_day || !userData.address || !userData.city || !userData.sex || !userData.status)) {
        setStatus('Account');
      } else if (accountStatus ==  'Account' && (!userData.name_of_business || !userData.address_of_business || !userData.nature_of_business || !userData.position)) {
        setStatus(userData.status);
      }
    }
  },[userData])


  const verfyingInputs =()=> {
    dispatch(register(
      name,
      email,
      password,
      confirm_password,
    ));
  }

  
  return (

      <ScrollView style={{backgroundColor:'white'}}>
        <View style={styles.container}>          
          <KeyboardAvoidingView  behavior="position" style={styles.form} keyboardVerticalOffset={-70}>
            <Text style={{fontWeight:'bold',fontSize: 38, marginLeft: 20, marginTop: 20, color:'#4f4f4f' }}>Sign Up</Text>
            <Image source={require('../assets/image/Profile.png')} style={styles.image} resizeMode="contain"/>
            <View style={{padding: 5}}>
              
              <TextInput
                style={styles.input}
                placeholder='FULL NAME'
                placeholderTextColor='#808080'  
                returnKeyType='next'
                onChangeText={ text=>setName(text)}
                value={name}
              />

              <TextInput
                style={styles.input}
                placeholder='EMAIL ADDRESS'
                placeholderTextColor='#808080'  
                returnKeyType='next'
                onChangeText={ text=>setEmail(text)}
                value={email}
              />

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
                <Icon name={Hide === false ? 'eye' : 'eyeo' } size={30} color='#f68025'/>
              </TouchableOpacity>  

              <TextInput
                style={styles.input}
                placeholder='**********'
                placeholderTextColor='#808080'
                returnKeyType='done'
                secureTextEntry={Hide}
                onChangeText={ text=>setConfirmPassword(text)}
                value={confirm_password}
              />
              <TouchableOpacity style={styles.SignupBtn} onPress={ verfyingInputs}>
                <Text style={styles.SignupText}>Signup</Text>
              </TouchableOpacity>

              <Text style={{color: '#808080', fontWeight: 'bold', alignSelf: 'center'}}>Already Have an Account? 
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Login')}>
                  <Text style={{color: '#f68025', fontWeight: 'bold'}}> Log In</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
              
          </KeyboardAvoidingView>         
 
        <AccountDetails accountStatus={accountStatus}/>
        <AccountStatusEmployer accountStatus={accountStatus} setStatus={setStatus}/>
        <AccountStatusEmployee accountStatus={accountStatus} setStatus={setStatus}/>

        </View>
      </ScrollView>
        
    
  );
}


export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  image:{
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    width: 117,
    height: 117,
  },
  form:{
    marginHorizontal: 15,
  },
  text:{
    color: '#f68025',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  input:{
    borderBottomWidth: 1, 
    borderStyle: 'solid', 
    marginBottom: 30,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  eyeBtn: {
    alignSelf: 'flex-end',
    position: "absolute",
    top: 150,
    left: 275 
  },  
  SignupBtn: {
    borderColor: '#f68025',
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center'
  },
  SignupText:{
    color: '#f68025',
    fontSize: 20,
    fontWeight: 'bold',
  },

});