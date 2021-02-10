import React from 'react';
import { StyleSheet,Image,ScrollView } from 'react-native';
import { View, Text, List } from '../../components';
import { theme } from '../../constants';

function Notifications() {
  return (
    <View white style={styles.container}>
      <View flex={false} center height={50} marginTop={25} paddingTop={10}> 
          <Text caption size={25} accent> Notifications </Text>
      </View> 

      <List
        marginTop={15}
        data={[
          {
            name: 'Ajinomoto', 
            info: 'You have successfully hired ajinomoto under the category of macho dancer',
            time: '2m',
            image: require('../../assets/temp_image/ajinomoto.png'),
          },
          {
            name: 'National Aeronautics and Space Administration', 
            info: 'Good day! We are pleased to announce that you are qualified to...',
            time: '10m',
            image: require('../../assets/temp_image/nasa.png'),
          },
          {
            name: 'SpaceX', 
            info: 'Good evening! We regret to inform you that you are ineligible to be part of the expedition to the moon.',
            time: '3h',
            image: require('../../assets/temp_image/spacex.png'),
          },
          {
            name: 'Magic Sarap', 
            info: 'You\'re temporary employment for Magic Sarap has been completed.',
            time: '11h',
            image: require('../../assets/temp_image/ms.png'),
          },
        ]}

        renderItem={({item, index})=>  <Notification_ListView item={item} index={index}  />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item,index)=> index.toString()}
      />


    </View>
  );
}

function Notification_ListView(props){
  const {item, index} = props;
  const {name, info, time, image} = item;

  return(
    <View row round={15} borderWidth={2} borderColor={theme.colors.accent} height={130} marginBottom={10} padding={10}>
       <Image
          source={image}
          style={styles.dp}
       />
       <ScrollView paddingLeft={20} paddingTop={5}  showsVerticalScrollIndicator={false}>   
          <Text accent size={20} style={styles.name}>{name}</Text>
          <Text accent size={15} style={styles.name}>{info}</Text>
       </ScrollView>
    </View>
  );
}

export default Notifications;

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: theme.size.padding * 2,
  },
  dp: {
    height: 100,
    width: 100,
    borderRadius: 40,
    borderColor: theme.colors.accent,
    borderWidth: 2,
  },
  name:{
    width: '100%',
  }
});
