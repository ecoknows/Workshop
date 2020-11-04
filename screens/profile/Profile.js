import React from 'react';
import { StyleSheet, } from 'react-native';
import { View, Text, Pic } from '../../components';

function Main({navigation}) {
  return (
    <View accent>
      <Top/>
      <Bottom/>
    </View>
  );
}

function Top(props){
  return(
    <View peach>
      
    </View>
  );
}

function Bottom(props){
  return(
    <View white flex={1.5}> 
      <View peach marginVertical={5} paddingTop={5} paddingLeft={10}> 

        <Text>
          Job Profile
        </Text>

        <View rowVerse flex={3}>
          
         <View flex={0.7}>
              <Text>John Smith</Text> 
              <Text>Painter</Text> 

          </View>

          <Pic
            flex={false}
            size={['100%', '35%']}
            src={require('../../assets/temp_image/john_smith.png')}
          />
        </View>
        <View rowVerse paddingBottom={1}>
          
          <Pic
              flex={0}
              size={['100%', '10%']}
              src={require('../../assets/icons/arrow-left-double.png')}
              resizeMode='contain'
            />
        </View>
      </View>

      <View peach marginVertical={5}>
        
      </View>
      
      <View peach marginVertical={5}>
        
      </View>
  </View>
  );
}

export default Main;


const styles = StyleSheet.create({
});
