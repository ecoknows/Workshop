import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../../components';

function JobSearch({navigation}) {
  return (
    <View style={styles.container}>
      <Text h1 accent bold >Job Search</Text>
      <Text caption accent bold touchable press={()=>navigation.navigate('WorkerProfile')}>Employee Profile</Text>
      
    </View>
  );
}

export default JobSearch;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
