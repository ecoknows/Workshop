import React from 'react';
import { StyleSheet,TouchableOpacity, StatusBar } from 'react-native';
import { View, Text, Pic } from '../../../components';
import {useDispatch} from 'react-redux';
import {openDrawerAction} from '../../../redux';

function Main({navigation}) {
  return (
    <View white>
    <Top/>
    <Bottom/>
    </View>
  );
}


function Top(props){
  const dispatch = useDispatch();
  return(
    <View flex={false} middle center paddingTop={StatusBar.currentHeight+ 10} paddingBottom={20}>
      
        <TouchableOpacity style={{position: 'absolute', top:StatusBar.currentHeight+5, right:'5%', height: 40,width: 40, alignItems:'flex-end'}}
        onPress={()=>{
          dispatch(openDrawerAction())
        }}
        >

            <Pic 
            src={require('../../../assets/icons/burger.png')}
            style={{resizeMode: 'contain', height: 20, width: 20}}
            />
        </TouchableOpacity>
        <Pic 
        src={require('../../../assets/temp_image/john_smith.png')}
        profile_picture 
        />
        <Text extra_bold gray size={17}> 
          Jerico C. Villaraza
        </Text>
        <Text bold size={12} gray> 
          Manila, Philippines
        </Text>
        
    </View>
  );
}

function Bottom(props){
  return(
    <View white flex={1.5} paddingVertical={10}> 
     
    </View>
  );
}

export default Main;


const styles = StyleSheet.create({
  bottom_botton_style_first : {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#EAEAEA',
    borderBottomColor: '#EAEAEA',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
  },
  bottom_botton_style : {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
  },
  bottom_botton_text_style : {
    textAlign: 'center', 
    textAlignVertical: 'center',
    marginLeft: 10,
    color: '#917C7C',
  },
  icon:{
      height: 45,
      width: 45,
      resizeMode:'contain'
  }
});
