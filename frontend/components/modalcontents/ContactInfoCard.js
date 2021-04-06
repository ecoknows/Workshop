import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

const dummy = {
  phone: '+63 912 345 6789',
  isVerified: 'true',
};

const ContactInfoCard = ({email, isVerified}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Primary Phone Number</Text>
      <View style={styles.row}>
        {dummy.isVerified ? (
          <Image
            source={require('../../ass/state-icons/check.png')}
            style={{marginLeft: 20}}
          />
        ) : (
          <Image
            source={require('../../assets/state-icons/cross.png')}
            style={{marginLeft: 20}}
          />
        )}
        <Text style={styles.phone}>{dummy.phone}</Text>
      </View>

      <View style={[{alignItems: 'flex-start', marginLeft: 80}]}>
        <View style={[styles.row, {marginTop: -15, height: 20}]}>
          {dummy.isVerified ? (
            <Text style={[styles.text, {fontStyle: 'italic'}]}>Verified</Text>
          ) : (
            <Text style={[styles.text, {fontStyle: 'italic'}]}>
              Not Verified
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
export default ContactInfoCard;

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    marginHorizontal: 20,
    marginTop: 30,
    // backgroundColor:'yellow'
  },
  row: {
    marginTop: 10,
    height: 40,
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    color: '#4F4F4F',
  },
  phone: {
    flex: 1,
    marginLeft: 40,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
});
