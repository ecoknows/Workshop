import React from 'react';
import {Text, View, StyleSheet, Image, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Button from '../ButtonAlbert';

const PasswordModalContent = ({email, isVerified}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Current Password"
        style={styles.textInput}></TextInput>
      <TextInput
        placeholder="New Password"
        style={styles.textInput}></TextInput>
      <TextInput
        placeholder="Retype Password"
        style={styles.textInput}></TextInput>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => Alert.alert('Cancel pressed.')} />
        <Button title="Save" onPress={() => Alert.alert('Save pressed')} />
      </View>
    </View>
  );
};
export default PasswordModalContent;

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    width: '90%',
    alignItems: 'center',
    // backgroundColor:'yellow'
  },

  text: {
    fontSize: 14,
    color: '#4F4F4F',
  },
  textInput: {
    // textAlign:'center',
    borderBottomColor: '#4F4F4F',
    borderBottomWidth: 1,
    marginTop: 20,
    width: '90%',
    paddingBottom: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '13%',
  },
});
