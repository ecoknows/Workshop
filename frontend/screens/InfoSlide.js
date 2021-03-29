import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components';
import { check_login_user } from '../database/current_user';
import { useSelector, useDispatch } from 'react-redux';



function Main({ navigation }) {

  const { userData, error } = useSelector(state=> state.userDetails);
  useEffect(() => {
    if (userData) {
      if(userData.verified){  
          navigation.replace('UserScreen'); 
      }
    }
    if (error) {
      console.log(error);
    }
  }, [userData, error]);

  return (
    <View style={styles.container}>
      <Text caption accent bold>
        Info Slide
      </Text>

      <View flex={false} row>
        <Text
          caption
          accent
          bold
          touchable
          press={() => {
            navigation.navigate('Login');
          }}
        >
          Login
        </Text>
        <Text
          caption
          accent
          bold
          touchable
          press={() => navigation.navigate('SignUp')}
        >
          Sign up
        </Text>
      </View>
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
