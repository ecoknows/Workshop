import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../constants';
import Pic from './Pic';
import Text from './Text';
import View from './View';

interface SkillsProps {
    skills: (string | number ) [], 
    size? : number,
    iconScale? : number,
    add?: boolean,

}

const BADGE = [
    {text: 'New', color: '#148D00',icon: require('../assets/icons/profile/star.png')},
    {text: 'Authorized', color: '#D2B100',icon : require('../assets/icons/profile/star.png')},
    {text: 'Scam', color: '#AA0000',icon : require('../assets/icons/profile/star.png')},
    {text: 'Add', color: '#0083AC', icon: require('../assets/icons/profile/add.png')},
]


function Skills(props:  SkillsProps){
    const { skills,size, iconScale ,add } = props;
    
    if(add){
        skills.push(3);
    }


    return(
        <View flex={false} row style={{width: '100%', flexWrap: 'wrap'}} middle center>
            {skills.map((item, index) => (

                    typeof item == 'string' ?          
                        <Text key={index} accent medium size={size || 14} style={[styles.border,{borderColor: theme.colors.accent}]}>{item}</Text>
                    : <View flex={false} key={index} style={[styles.border, {borderColor: BADGE[item].color}]} row>
                        <Pic src={BADGE[item].icon} scale={ iconScale || 18}  style={{marginRight: 4}}/>
                        <Text key={index} medium size={ size || 14} color={BADGE[item].color}>{BADGE[item].text}</Text> 
                      </View>
                )
            )}
        </View>
    )

}

export default Skills;

const styles = StyleSheet.create({
    border: {
        borderWidth : 1,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 100,
        marginRight: 3,
        marginTop: 4,
    }
});