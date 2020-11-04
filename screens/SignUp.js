
import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
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
import { sign_up, add_users, current_user_id } from '../database/firebase';
import { set_user_info } from '../database/current_user';

function Main({navigation}) {
  
  const[Hide,setHide] = useState(true);
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  return (

      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          
          <KeyboardAvoidingView  behavior="position" style={styles.form} keyboardVerticalOffset={-70}>
          <Image source={require('../assets/Signup.png')} style={styles.image} resizeMode="contain"/>
          <View style={{backgroundColor: '#FFFFFF', padding: 5}}>
            
            <Text style={styles.text}>Name</Text>
              <TextInput
              style={styles.input}
              placeholder='Alex Camry'
              placeholderTextColor='#dfe6e9'  
              returnKeyType='next'
              onChangeText={ text=>setName(text)}
              value={name}
            />
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

            <TouchableOpacity style={styles.SignupBtn} onPress={ () => SignUpButtonClick(name,email,password, navigation)}>
              <Text style={styles.SignupText}>Signup</Text>
            </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          
          <Text style={{
            color: '#003A63', 
            alignSelf: 'center', 
            marginTop: 15
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

function SignUpButtonClick (name, email, pass, navigation){

  sign_up(email,pass, ()=>{
    const uid = current_user_id();
    add_users({
      uid,
      name,
      email,
      pass,
    })
    navigation.navigate('UserScreen');
  });
}

export default Main;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 5,
    backgroundColor: '#f68025'
  },
  image:{
    width: 349,
    height: 255,
  },
  form:{
    marginHorizontal: 5,
  },
  text:{
    color: '#f68025',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  input:{
    borderBottomColor: "#f68025", 
    borderBottomWidth: 2, 
    borderStyle: 'solid', 
    marginBottom: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  eyeBtn: {
    alignSelf: 'flex-end',
    position: "absolute",
    top: 200,
    left: 295 
  },  
  SignupBtn: {
    borderColor: '#f68025',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center'
  },
  SignupText:{
    color: '#f68025',
    fontSize: 20,
    fontWeight: 'bold',
  },
  socIcon: {
    flexDirection: 'row',  
    justifyContent: 'space-evenly', 
    alignSelf: 'center', 
    marginTop: 10, 
    width: 125 
  },
});