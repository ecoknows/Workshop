import React from 'react';
import { StyleSheet,TouchableOpacity, StatusBar } from 'react-native';
import { View, Text, Pic, Table } from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {openDrawerAction} from '../../../redux';
import Skills from '../../../components/Skills';
import { theme } from '../../../constants';

function Main({navigation} ) {
  return (
    <View flex white>
    <Top/>
    <Bottom/>
    </View>
  );
}

const testdata = [
  {job:'Software Developer', workers: '4/5', status: true},
  {job:'Graphics Designer', workers: '2/2', status: false},
  {job:'Mechanical Engineer', workers: '5/6', status: true} 
]


function Top(){
  const dispatch = useDispatch();
  const UserState = useSelector((state) => state.userDetails);
  const { error, loading ,userData} = UserState;
  return(
    <View middle center paddingHorizontal={5} paddingTop={StatusBar.currentHeight}>
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
        src={require('../../../assets/image/user/man.png')}
        profile_picture 
        />
        <Text extra_bold gray size={23}> 
          Jerico C. Villaraza
        </Text>
        <Text medium size={14} gray> 
          Manila, Philippines
        </Text>

        <View width={'80%'} marginVertical={5} center middle>
          <Skills skills={['Manager', 'Enterprenuer', 0]}/>
        </View>
        
        <Table
            height={'50%'}
            data={testdata}
            renderHeader={()=>(
              <View row paddingVertical={3}>
                <View flex={1.3}>
                    <Text bold gray>Find Employee</Text>
                </View>
                <View flex middle>
                    <Text bold gray>Workers</Text>
                </View>
                <View flex middle>
                    <Text bold gray>Status</Text>
                </View>
              </View>
            )}
            renderItem={({item},index)=>(
              <View row key={index} center middle style={{borderTopColor: '#CCCCCC', borderTopWidth: 1, paddingVertical: 3}}>
                <View flex={1.3} >
                    <Text gray>{item.job}</Text>
                </View>
                <View flex middle>
                    <Text gray>{item.workers}</Text>
                </View>
                <View flex middle>
                    {
                      item.status? <Text green>Available</Text> : <Text red>Full</Text>
                    }
                </View>
              </View>
            )}
        />

        <TouchableOpacity style={{paddingTop:10}}>
          <View row middle>
            <Pic
              src={require('../../../assets/icons/profile/job.png')}
            />
            <Text semi_bold color='#145DCA'>Add a Job</Text>
          </View>
        </TouchableOpacity>
        
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
