import React, {useState} from 'react';
import Pic from './Pic';
import View from './View';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';

interface InputPasswordInterface {
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
  style?: any;
}

function InputPassword(props: InputPasswordInterface) {
  const {placeholder, onChangeText, value, style, ...rest} = props;
  const [see, setSee] = useState(false);
  return (
    <View style={styles.input}>
      <TextInput
        {...rest}
        placeholder={placeholder}
        placeholderTextColor="#808080"
        returnKeyType="next"
        style={style}
        secureTextEntry={!see}
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

export default InputPassword;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
