import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components';

function InfoSlide({navigation}) {

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

export default InfoSlide;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
