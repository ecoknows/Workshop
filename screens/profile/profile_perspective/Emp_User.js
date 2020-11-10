import React from 'react';
import { StyleSheet, } from 'react-native';
import { View, Text, Pic } from '../../../components';


function Main({navigation}) {
  return (
    <View white>
    <Top/>
    <Bottom/>
    </View>
  );
}

function Top(props){
  return(
    <View flex={false} middle center paddingTop={30} paddingBottom={20}>
        <Pic 
        src={require('../../../assets/icons/burger.png')}
        style={{position: 'absolute', resizeMode: 'contain', top:'10%', right:'5%'}}
        />
        <Pic 
        src={require('../../../assets/temp_image/john_smith.png')}
        profile_picture 
        />
        <Text extra_bold gray size={17}> 
          Russel Johnson 
        </Text>
        <Text bold blue size={14} marginY={[5,5]}> 
          Employer
        </Text>
        <View flex={false} row>
          
          <View center middle>
            <Text bold yellow size={14}> 
              LOCATION
            </Text>
            <Text semi_bold size={14}> 
              Manila
            </Text>
          </View>
          
          <View center middle> 
            <Text bold yellow size={14}> 
              AUTHORIZED
            </Text>
            
            <Text red semi_bold size={14}> 
              Scam
            </Text>
          </View>


        </View>
        
    </View>
  );
}

function Bottom(props){
  return(
    <View white flex={1.5} paddingVertical={10}> 
      <View flex={false} style={styles.bottom_botton_style_first} row>
        <Pic 
        src={require('../../../assets/icons/bubble_message.png')}
        style={{resizeMode:'contain'}}
        />
        
        <Text bold size={17} style={styles.bottom_botton_text_style}> 
           Want to contact me ? 
        </Text>
      </View>
      <View flex={false} style={styles.bottom_botton_style} row>
        <Pic 
        src={require('../../../assets/icons/report.png')}
        style={{resizeMode:'contain'}}
        />
        
        <Text bold size={17} style={styles.bottom_botton_text_style}> 
           Did I do wrong ? 
        </Text>
      </View>
      
      <View flex={false} style={styles.bottom_botton_style} row>
        <Pic 
        src={require('../../../assets/icons/rate.png')}
        style={{resizeMode:'contain'}}
        />
        
        <Text bold size={17} style={styles.bottom_botton_text_style}> 
           Rate Me
        </Text>
      </View>


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
});
