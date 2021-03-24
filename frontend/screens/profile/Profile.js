import React from 'react';
import { StyleSheet, } from 'react-native';
import { View, Text, Pic } from '../../components';
import {Emp_User} from './profile_perspective';

function Main({navigation}) {
  return (
    <View flex>
    
    <Emp_User navigation={navigation}/>
    </View>
  );
}

export default Main;
