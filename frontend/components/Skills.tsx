import React,{useState} from 'react';
import { TouchableOpacity, Modal, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { theme } from '../constants';
import Pic from './Pic';
import Text from './Text';
import View from './View';
import ModalBox from './ModalBox';
import Button from './Button';
import {useDispatch} from 'react-redux';
import { update_tag } from '../redux';
interface SkillsProps {
  skills: (string | number)[];
  size?: number;
  iconScale?: number;
  add?: boolean;
  authorized: number;
}

const BADGE = [
  {
    text: 'New',
    color: '#148D00',
    icon: require('../assets/icons/profile/star.png'),
  },
  {
    text: 'Authorized',
    color: '#D2B100',
    icon: require('../assets/icons/profile/star.png'),
  },
  {
    text: 'Scam',
    color: '#AA0000',
    icon: require('../assets/icons/profile/star.png'),
  },
];

function Skills(props: SkillsProps) {
  const { size, iconScale, add, authorized } = props;
  const [create,setCreate] = useState(false);
  const [tag, setTag] = useState('');
  let { skills } = props;
  if (skills == undefined) skills = [];
  const dispatch = useDispatch();

  
  return (
    <View
      flex={false}
      row
      style={{ width: '100%', flexWrap: 'wrap' }}
      middle
      center
    >

      {skills.map((item, index) =>
       (
          <Text
            key={index}
            accent
            medium
            
            size={size || 14}
            style={[styles.border, { borderColor: theme.colors.accent }]}
          >
            {item}
          </Text>
        )
      )}
        <View
        flex={false}
        style={[styles.border, { borderColor: BADGE[authorized].color }]}
        row
        >
            <Pic
              src={BADGE[authorized].icon}
              scale={iconScale || 18}
              style={{ marginRight: 4 }}
            />
            <Text
              medium
              size={size || 14}
              color={BADGE[authorized].color}
            >
              {BADGE[authorized].text}
            </Text>
        </View>
        
        
        
        {
          create ? 
          <TextInput
          autoFocus
          maxLength={15}
          value={tag}
          onChangeText={text => setTag(text)}
          style={[styles.tag_input,{ borderColor: theme.colors.accent, color: theme.colors.accent, fontSize: size || 14, height:( size || 14 ) + 10}]}
          placeholder='Tag name'
        />
          :
          null
        }{
          create ? 

          <TouchableOpacity style={[styles.border, {borderColor: '#AA0000', flexDirection:'row'}]}
          onPress={()=> setCreate(!create)}
          >
                <Text
                  medium
                  size={size || 14}
                  color={'#AA0000'}
                >
                  Cancel
                </Text>
          </TouchableOpacity>
          : null
        }

        {
          add ? 
          <TouchableOpacity style={[styles.border, {borderColor: create ? '#148D00': '#0083AC', flexDirection:'row'}]}
            onPress={()=> {
              if(create){
                if(tag != ''){
                  dispatch(update_tag([...skills, tag]));
                }
              }
              setCreate(!create);
            }}
          >
              {
                !create ? 

                <Pic
                  src={require('../assets/icons/profile/add.png')}
                  scale={iconScale || 18}
                  style={{ marginRight: 4 }}
                />
                :
                null
              }
                <Text
                  medium
                  size={size || 14}
                  color={create ? '#148D00':'#0083AC'}
                >
                  {create ? "Create": 'Add'}
                </Text>
          </TouchableOpacity>
          :
          null
        }

      
    </View>
  );
}


export default Skills;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
    marginRight: 3,
    marginTop: 4,
  },
  tag_input:{
    borderColor:'black',
    borderWidth: 1,
    textAlign:'center',
    borderRadius: 100,
    paddingHorizontal: 10,
    marginRight: 3,
    marginTop: 4,
  }
});
