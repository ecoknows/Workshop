import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text } from '../../../components';

function WorkerProfile() {
  return (
    <View>

      <View flex={15} style={styles.container} >
            <Text caption accent bold >Worker Profile</Text>
      </View>

      <View row white >
          <View touchable flex={1} center middle>
            <Image source={require('../../../assets/icons/cancel.png')} style={styles.icon} resizeMode='contain' />
            <Text size={11} accent >cancel</Text>
          </View>

          <View touchable flex={1} center middle>
            <Image source={require('../../../assets/icons/message.png')} style={styles.icon} resizeMode='contain' />
            <Text size={11} accent >message</Text>
          </View>

          <View touchable flex={1} center middle>
            <Image source={require('../../../assets/icons/hire.png')} style={styles.icon} resizeMode='contain' />
            <Text size={11} accent >hire</Text>
          </View>

      </View>

    </View>
  );
}

export default WorkerProfile;


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon:{
        width: 25,
        height: 25,
        
    },
  });
