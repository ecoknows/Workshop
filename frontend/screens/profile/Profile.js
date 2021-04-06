import React, { useEffect } from 'react';
import { StyleSheet, } from 'react-native';
import { View, Text, Pic } from '../../components';
import {Emp_User, Worker_User} from './profile_perspective';
import {useSelector } from 'react-redux';

function Main({navigation}) {

  const {userData} = useSelector(state=>state.userDetails);
  useEffect(()=>{
    if(userData == undefined){
      navigation.replace('Login');
    }
  },[userData])
  

  return (
    <View flex>
    {
      userData?.is_employer ? <Emp_User navigation={navigation}/> : 
      <Worker_User navigation={navigation}/>
    }
    </View>
  );
}

export default Main;
