import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

// import { FontAwesome5 } from '@expo/vector-icons';

import EmailInfoCard from './EmailInfoCard';
import ContactInfoCard from './ContactInfoCard';

const ContactInformationModalContent = ({
  email,
  phone,
  isEmailVerified,
  isPhoneVerified,
}) => {
  const showEditForm = () => {
    Alert.alert('Edit button clicked');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showEditForm}>
        {/* <FontAwesome5 name="edit" size={20} color="black" style={{alignSelf:'flex-end',marginRight:5}} /> */}
      </TouchableOpacity>

      <EmailInfoCard email={email} isVerified={isEmailVerified} />
      <ContactInfoCard phone={phone} isVerified={isPhoneVerified} />
    </View>
  );
};

export default ContactInformationModalContent;

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    width: '100%',
    // backgroundColor:'pink'
  },
  backButton: {
    height: 30,
    width: 30,
  },
  profile: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  title: {
    color: '#4F4F4F',
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    color: '#4F4F4F',
    fontSize: 14,
  },
  form: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  spacing: {
    flex: 1.5,
    marginLeft: 30,
    marginTop: 10,
  },
});
