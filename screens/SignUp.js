import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function SignUp() {
  return (
    <View style={styles.container}>
      <Text>SignUp</Text>
      <StatusBar style="auto" />
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
