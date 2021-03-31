import React from 'react';
import Pic from './Pic';
import View from './View';
import { StyleSheet, TextInput } from 'react-native';


interface InputInterface{
    icon?: number,
    placeholder: string,
    onChangeText?: (text: string) => void,
    value?: string
}

function Input(props: InputInterface){
    const { icon, placeholder, onChangeText, value, ...rest } = props;
    return(
        <View style={styles.input}>
            <Pic
            src={icon}
            style={{marginRight: 10}}
            scale={35}
            />
            <TextInput
                {...rest}
                placeholder={placeholder}
                placeholderTextColor='#808080'  
                returnKeyType='next'
                style={{paddingVertical: 5,width:'100%'}}
                onChangeText={onChangeText}
                value={value}
            />
      </View>
    )
}

export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1, 
    borderStyle: 'solid', 
    marginBottom: 30,
    paddingHorizontal: 8,
    marginHorizontal: 10,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    flexDirection: 'row'
    
  },
});