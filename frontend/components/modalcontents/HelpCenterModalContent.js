import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

import Button from '../ButtonAlbert';

const HelpCenterModalContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={require('../../assets/settings/asking1.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.report}>
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={styles.text}>Report a Problem:</Text>
        </View>
        <TextInput
          placeholder="Write message..."
          style={styles.textInput}
          multiline={true}></TextInput>
        <View style={{alignSelf: 'flex-end', marginTop: 10, marginRight: 15}}>
          <Button title="Send" onPress={() => Alert.alert('')} />
        </View>
      </View>
      <View style={[styles.report, {marginTop: 20}]}>
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={styles.text}>Actions</Text>
          <View style={{marginLeft: 20}}>
            <TouchableOpacity
              onPress={() => Alert.alert('Change email address pressed.')}>
              <Text style={styles.orangeText}>Change email address</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={styles.orangeText}
                onPress={() => Alert.alert('Change phone number pressed.')}>
                Change phone number
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={styles.orangeText}
                onPress={() => Alert.alert('Change password pressed.')}>
                Change password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={styles.orangeText}
                onPress={() => Alert.alert('Change close account pressed.')}>
                Close account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HelpCenterModalContent;

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    width: '100%',
  },
  profile: {
    alignItems: 'center',
  },
  img: {
    marginTop: 30,
    height: 100,
    width: 100,
  },
  report: {
    marginTop: 50,
    alignItems: 'center',
    // backgroundColor:'red'
  },
  text: {
    fontSize: 18,
    color: '#4F4F4F',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  orangeText: {
    fontSize: 14,
    color: '#F68025',
    margin: 5,
  },
  textInput: {
    textAlignVertical: 'top',
    width: '90%',
    height: 85,
    borderWidth: 1,
    borderColor: 'black',
    opacity: 0.34,
    padding: 10,
  },
});
