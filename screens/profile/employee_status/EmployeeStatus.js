import React from 'react';
import { StyleSheet,} from 'react-native';
import { View, Text } from '../../../components';

function EmployeeStatus({navigation}) {
  return (
    <View style={styles.container}>
      <Text caption accent bold >Employee Status</Text>
    </View>
  );
}

export default EmployeeStatus;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
