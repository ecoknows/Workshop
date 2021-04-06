import React from 'react';
import {Text, View, StyleSheet, Image, Alert} from 'react-native';

import Button from '../ButtonAlbert';

const dummy = {
  notifMessage: {
    description1:
      'This is to inform you that the applicant you hired above confirmed your hiring notice.',
    description2:
      'Please established a connection with the employee immediately to negotiate the terms regarding the job.',
  },
};

const AdminModalContent = ({name, title, jobTitle}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={require('../../assets/image/user/man.png')}
          style={{height: 150, width: 150}}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.bold}>{title}</Text>
        <View style={styles.msg}>
          <Text style={styles.textStyle}>
            {dummy.notifMessage.description1}
          </Text>
          <Text style={styles.textStyle}>
            {dummy.notifMessage.description2}
          </Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.bold}>For Position of:</Text>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Message"
          onPress={() => Alert.alert('Message Pressed')}
        />
        <Button
          title="Confirm"
          onPress={() => Alert.alert('Confirm Pressed')}
        />
      </View>
    </View>
  );
};

export default AdminModalContent;

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    width: '100%',
  },
  backButton: {
    height: 30,
    width: 30,
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  msg: {
    marginTop: 15,
    marginLeft: 20,
  },
  name: {
    color: '#4F4F4F',
    fontSize: 20,
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  textStyle: {
    textAlign: 'left',
    fontSize: 14,
    color: '#4F4F4F',
    marginBottom: 20,
  },
  jobTitle: {
    textAlign: 'center',
    marginHorizontal: 50,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingBottom: 5,
    color: '#4F4F4F',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: '15%',
    marginHorizontal: 20,
  },
});
