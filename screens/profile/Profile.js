import React from 'react';
import { StyleSheet, } from 'react-native';
import { View, Text } from '../../components';

function Profile({navigation}) {
  return (
    <View style={styles.container}>
      <Text h1 accent bold>Profile</Text>
      <Text caption accent bold touchable press={()=>navigation.navigate('JobProfile')}>Job Profile</Text>
      <Text caption accent bold touchable press={()=>navigation.navigate('Employee')}>Current Employee & Employer</Text>
    </View>
  );
}

export default Profile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
