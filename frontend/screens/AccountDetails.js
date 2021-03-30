import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, 
  Text, 
  View, 
  Modal,
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Pic } from '../components';
import {useSelector, useDispatch } from 'react-redux';
import { verify } from '../redux';

import {Text as ComponentText} from '../components';
import DocumentPicker from 'react-native-document-picker';

 
export function AccountDetails({accountStatus}){
  const [Birthday, setBirthday] = useState(null)
  const [Address, setAddress] = useState(null);
  const [City, setCity] = useState(null);
  const [Sex, setSex] = useState(null);
  const [statusChecker, setStatusChecker] = useState(null);
  const dispatch = useDispatch();
  

  const SignUpButtonClick =()=>{
    dispatch(verify({
      birth_day: Birthday,
      address: Address,
      city: City,
      sex: Sex,
      status: statusChecker,
    },'Account'))
  }

  return(
    <Modal
    animationType="slide"
    transparent={true}
    visible={accountStatus == 'Account'}
    >
      <ScrollView style={{backgroundColor:'white'}}>
        <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
          <Text style={styles.title}>{`Account\nDetails`}</Text>
        </View>
        

          <View style={styles.form}>
  
            <TextInput
              style={styles.input}
              placeholder='BIRTHDAY'
              placeholderTextColor='#808080'  
              returnKeyType='next'
              onChangeText={ text=>setBirthday(text)}
              value={Birthday}
            />

            <TextInput
              style={styles.input}
              placeholder='ADDRESS (No./Street/Subdivision)'
              placeholderTextColor='#808080'  
              returnKeyType='next'
              onChangeText={ text=>setAddress(text)}
              value={Address}
            />

            <TextInput
              style={styles.input}
              placeholder='CITY'
              placeholderTextColor='#808080'
              returnKeyType='done'
              onChangeText={ text=>setCity(text)}
              value={City}
            />         

            <TextInput
              style={styles.input}
              placeholder='SEX'
              placeholderTextColor='#808080'
              returnKeyType='done'                
              onChangeText={ text=>setSex(text)}
              value={Sex}
            />
              
            <DropDownPicker
              defaultValue={statusChecker}
              placeholder='STATUS'
                items={[
                  {label:'EMPLOYEE', value:'Employee'},
                  {label:'EMPLOYER', value:'Employer'}]}
                containerStyle={{
                  height: 40,
                  marginHorizontal: 5
                }}
                style={{
                  backgroundColor: '#fafafa', 
                  borderWidth: 0, 
                  borderBottomWidth:1, 
                  borderColor:'#4f4f4f'}}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                labelStyle={{
                  color: '#808080',
                  fontSize: 14,
                  fontWeight: '400',
                  marginVertical: 5,
                  marginHorizontal: 10,
                }}  
              onChangeItem={item => {setStatusChecker(item.value)}}
            />
              
            <TouchableOpacity style={styles.SignupBtn} onPress={SignUpButtonClick}>
              <Text style={styles.SignupText}>Next</Text>
            </TouchableOpacity>        
      
          </View>
      </ScrollView>
    
    </Modal>

    
    
    
  )
}

export function AccountStatusEmployer({accountStatus, setStatus}){
  const [name_of_business, setNameBusiness] = useState(null);
  const [address_of_business, setAddressBusiness] = useState(null);
  const [nature_of_business, setNatureBusiness] = useState(null);
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState([]);

  const SignUpButtonClick =()=>{
    dispatch(verify({
      name_of_business,
      address_of_business,
      nature_of_business,
      position,
    }, 'Employer'))
  }

  const pickDocument = async() =>{

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setDocuments(doc => [...doc, res]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }

  }


  return(
    <Modal
    animationType="slide"
    transparent={true}
    visible={accountStatus == 'Employer'}
    >
      <ScrollView style={{backgroundColor:'white'}}>
        <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
          <Text style={styles.title}>{`Employer\nAccount`}</Text>
          <Text style={styles.back} onPress={()=>{setStatus('Account')}}>BACK</Text>
        </View>
        
        <View style={styles.form}>

          <TextInput
            style={styles.input}
            placeholder='NAME OF BUSINESS'
            placeholderTextColor='#808080'  
            returnKeyType='next'
            onChangeText={text => setNameBusiness(text)}
          />

          <TextInput
            style={styles.input}
            placeholder='ADDRESS OF BUSINESS'
            placeholderTextColor='#808080'  
            returnKeyType='next'
            onChangeText={text => setAddressBusiness(text)}
          />

          <TextInput
            style={styles.input}
            placeholder='NATURE OF BUSINESS'
            placeholderTextColor='#808080'  
            returnKeyType='next'
            onChangeText={text => setNatureBusiness(text)}
          />

          <TextInput
            style={styles.input}
            placeholder='POSITION'
            placeholderTextColor='#808080'  
            returnKeyType='next'
            onChangeText={text => setPosition(text)}
          />

          <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start'}}>
            <Pic
              src={require('../assets/icons/document.png')}
              scale={30}
              style={{marginRight: 5}}
            />
            <View style={{paddingEnd: 5}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <ComponentText medium gray size={15} style={{marginEnd: 4}} >
                  DOCUMENTATION: 
                </ComponentText >

                <ComponentText medium gray size={14} >(If applicable)</ComponentText >
              </View>
                <ComponentText medium gray size={12}>
                  This may expedite the authorization process.
                </ComponentText>  

                <ComponentText medium gray size={12}>
                  (e.g. business permit)
                </ComponentText>  
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop: 10}}>
                <View style={{borderBottomColor: '#C6C6C6', borderBottomWidth: 1, paddingHorizontal:10, marginEnd: 16}}>
                  <TextInput placeholder='Name of Document' style={{ paddingVertical:2}}/>
                </View>

                <TouchableOpacity style={{flexDirection:'row', borderColor:'#C6C6C6', borderWidth: 1, paddingHorizontal: 10, paddingVertical:2, borderRadius: 20, alignItems:'center', justifyContent:'center'}}
                  onPress={pickDocument}
                >
                  <Text>
                    Select File
                  </Text>
                  <Pic
                    src={require('../assets/icons/upload.png')}
                    scale={15}
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View  style={{justifyContent:'center', alignItems:'center',marginTop: 10}}>
                <TouchableOpacity>
                  <Pic
                    src={require('../assets/icons/add-gray.png')}
                    scale={30}
                  />
                </TouchableOpacity>
              </View>

            </View>

          </View>


          <TouchableOpacity style={styles.SignupBtn} 
          onPress={ SignUpButtonClick}>

            <Text style={styles.SignupText}>Finish</Text>
          </TouchableOpacity>

        </View>
      </ScrollView> 
    </Modal>
    
  
  )
}

export function AccountStatusEmployee({accountStatus, setStatus}){
  const [nature_of_work, setNatureWork] = useState(null);
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();


  const SignUpButtonClick =()=>{
    dispatch(verify({
      nature_of_work,
      position,
    }, 'Employee'))
  }

  return(
    <Modal
    animationType="slide"
    transparent={true}
    visible={accountStatus == 'Employee'}
    >
      <ScrollView style={{backgroundColor:'white'}}>
        <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
          <Text style={styles.title}>{`Employee\nAccount`}</Text>
          <Text style={styles.back} onPress={()=>setStatus('Account')}>BACK</Text>
        </View>
        
        <KeyboardAvoidingView behavior="position" style={styles.form}>

          <TextInput
            style={styles.input}
            placeholder='NATURE OF WORK'
            placeholderTextColor='#808080'  
            returnKeyType='next'
            value={nature_of_work}
            onChangeText={text => setNatureWork(text)}
          />

          <TextInput
            style={styles.input}
            placeholder='POSITION (if applicable)'
            placeholderTextColor='#808080'  
            returnKeyType='next'
            value={position}
            onChangeText={text => setPosition(text)}
          />
          
          <TouchableOpacity style={styles.SignupBtn} onPress={ () => {
            SignUpButtonClick();
            }}>
            <Text style={styles.SignupText}>Finish</Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
    
  
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  title:{
    fontWeight:'bold',
    fontSize: 38, 
    marginLeft: 20, 
    marginTop: 40, 
    marginBottom:30,
    color:'#4f4f4f' 
  },
  back:{
    marginRight: 20, 
    marginTop: 50, 
    marginBottom:30,
    color:'#4f4f4f'
  },
  form:{
    marginHorizontal: 35,
    marginTop: 20,
  },
  text:{
    color: '#f68025',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  input:{
    borderBottomWidth: 1, 
    borderStyle: 'solid', 
    marginBottom: 30,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 10,
  }, 
  SignupBtn: {
    borderColor: '#f68025',
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 30,
    marginTop:50,
    marginBottom: 20,
    alignSelf: 'center'
  },
  SignupText:{
    color: '#f68025',
    fontSize: 20,
    fontWeight: 'bold',
  },

});