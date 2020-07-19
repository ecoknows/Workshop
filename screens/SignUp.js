import React from 'react';
import { StyleSheet, } from 'react-native';
import { Text, View } from '../components';

function SignUp({navigation}) {
  return (
    <View style={styles.container}>
      <Text caption accent bold touchable press={()=> navigation.navigate('UserScreen')} >SignUp</Text>
    </View>
  );
}

export default SignUp;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
