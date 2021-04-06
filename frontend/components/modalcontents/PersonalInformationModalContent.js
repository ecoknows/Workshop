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
// import { TouchableHighlight } from 'react-native-gesture-handler';

const dummy = {
  name: 'Albert John Tulop',
  address: {
    city: 'Caloocan',
    country: 'Philippines',
  },
  birthday: 'April 17, 2000',
  sex: 'Male',
};

const PersonalInformationModalContent = (name, address, birthday, sex) => {
  const showEditForm = () => {
    Alert.alert('Edit button clicked');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={require('../../assets/settings/Profile.png')}
          style={{marginTop: 30, height: 150, width: 150}}
        />
        {/* <Text style={styles.name}>{dummy.name}</Text> */}
      </View>

      <TouchableOpacity onPress={showEditForm}>
        {/* <FontAwesome5 name="edit" size={20} color="black" style={{alignSelf:'flex-end',marginRight:5}} /> */}
      </TouchableOpacity>

      <View style={(styles.container, styles.form)}>
        <View style={styles.spacing}>
          <Text style={styles.title}>Name</Text>
          <Text style={styles.description}>{dummy.name}</Text>
        </View>
        <View style={styles.spacing}>
          <Text style={styles.title}>Birthday</Text>
          <Text style={styles.description}>{dummy.birthday}</Text>
        </View>
      </View>

      <View style={(styles.container, styles.form)}>
        <View style={styles.spacing}>
          <Text style={styles.title}>Address</Text>
          <Text style={styles.description}>
            {dummy.address.city}, {dummy.address.country}
          </Text>
        </View>
        <View style={styles.spacing}>
          <Text style={styles.title}>Sex</Text>
          <Text style={styles.description}>{dummy.sex}</Text>
        </View>
      </View>
    </View>
  );
};

export default PersonalInformationModalContent;

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    width: '100%',
    // backgroundColor:'pink'
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
