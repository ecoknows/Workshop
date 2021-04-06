import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import Button from '../ButtonAlbert';

const dummy = {
  notifMessage: {
    description1:
      'This is to inform you that your employer stated above sent you the payment regarding your project.',
    description2:
      'Wait for at least 24 hours to process the transaction. Report if you have not received your payment within 3 days.',
  },
};

const EmployeeModalContent = ({name, title}) => {
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
      <View style={styles.buttonContainer}>
        <Button title="Message" />
        <Button title="Confirm" />
      </View>
    </View>
  );
};

export default EmployeeModalContent;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
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
    borderColor: '#4F4F4F',
    paddingBottom: 5,
    color: '#4F4F4F',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: '15%',
    marginHorizontal: 10,
  },
});
