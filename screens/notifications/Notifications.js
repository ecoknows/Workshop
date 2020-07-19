import React from 'react';
import { StyleSheet,} from 'react-native';
import { View, Text } from '../../components';

function Notifications() {
  return (
    <View style={styles.container}>
      <Text accent caption bold>Notifications</Text>
    </View>
  );
}

export default Notifications;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
