import React from 'react';
import { StyleSheet, } from 'react-native';
import { View, Text, Pic } from '../../components';
import { theme } from '../../constants';

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
    <View peach row>
      <View accent>

      </View>
      
      <View white>
        
        <Pic 
        src={require('../../assets/temp_image/john_smith.png')}
        profile_picture 
        />
      </View>
      <View peach>

      </View>
    </View>
  );
}

function Bottom(props){
  return(
    <View white flex={1.5}> 
    </View>
  );
}

export default Main;


const styles = StyleSheet.create({
});
