import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';

interface ButtonProps {
  children: string;
  style?: object;
  onPress?: ()=>void 
}

function Button(props: ButtonProps) {
  const { children, style, onPress, ...rest } = props;

  return (
    <TouchableOpacity style={[styles.default_style, style]} {...rest} onPress={onPress}>
      <Text color="#F79040" size={12} medium>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  default_style: {
    backgroundColor: 'white',
    borderColor: '#FF900D',
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 2,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
});
