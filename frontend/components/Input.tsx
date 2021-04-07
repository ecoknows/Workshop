import React, {useState} from 'react';
import Pic from './Pic';
import View from './View';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';

interface InputInterface {
  icon?: number;
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
  password?: string;
}

function Input(props: InputInterface) {
  const {icon, placeholder, onChangeText, password, value, ...rest} = props;
  const [see, setSee] = useState(false);
  if (password) {
    return (
      <View style={styles.input}>
        <Pic
          src={icon}
          style={{marginRight: 10}}
          scale={25}
          resizeMode="contain"
        />
        <TextInput
          {...rest}
          placeholder={placeholder}
          placeholderTextColor="#808080"
          secureTextEntry={!see}
          returnKeyType="next"
          style={{paddingVertical: 5, flex: 1}}
          onChangeText={onChangeText}
          value={value}
        />
        <TouchableOpacity onPress={() => setSee(!see)}>
          {see ? (
            <Pic
              src={require('../assets/icons/eye.png')}
              style={{marginRight: 10}}
              scale={30}
            />
          ) : (
            <Pic
              src={require('../assets/icons/close-eye.png')}
              style={{marginRight: 10}}
              scale={30}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.input}>
      <Pic
        src={icon}
        style={{marginRight: 10}}
        scale={25}
        resizeMode="contain"
      />
      <TextInput
        {...rest}
        placeholder={placeholder}
        placeholderTextColor="#808080"
        returnKeyType="next"
        style={{paddingVertical: 5, flex: 1}}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginBottom: 30,
    paddingHorizontal: 8,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});
