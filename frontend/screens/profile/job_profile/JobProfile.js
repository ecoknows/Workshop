import React from 'react';
import { StyleSheet,} from 'react-native';
import { View, Text } from '../../../components';

function JobProfile({navigation}) {
  return (
    <View style={styles.container}>
      <Text caption accent bold >Job Profile</Text>
    </View>
  );
}

export default JobProfile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
