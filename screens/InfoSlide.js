import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components';
import {check_login_user } from '../database/current_user';

function Main({navigation}) {

  useEffect(()=>{
    check_login_user(()=>{
      navigation.navigate('UserScreen');
    });
  },[]);

  return (
    <View style={styles.container}>
      <Text caption accent bold>Info Slide</Text>

      <View flex={false} row>
         <Text caption accent bold touchable press={()=> navigation.navigate('Login')}>Login </Text>
         <Text caption accent bold touchable press={()=> navigation.navigate('SignUp')}> Sign up</Text>
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
