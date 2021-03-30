import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants';

interface TextProps {
  style?: object;
  children?: any;
  touchable?: () => void;

  marginX?: number[];
  marginY?: number[];

  accent?: boolean;
  gray?: boolean;
  blue?: boolean;
  green?: boolean;
  yellow?: boolean;
  red?: boolean;

  caption?: boolean;
  h1?: boolean;
  extra_bold?: boolean;
  semi_bold?: boolean;
  bold?: boolean;
  medium?: boolean;
  center?: boolean;

  color?: string;
  size?: number;
  press?: () => void;
}

const TextField = (props: TextProps) => {
  const {
    style,
    children,

    // behaviour
    touchable,

    // margins
    marginX,
    marginY,

    // color
    accent,
    gray,
    green,
    blue,
    yellow,
    red,
    color,
    center,

    // font size
    caption,
    h1,
    size,

    //Open_Sans
    extra_bold,
    semi_bold,
    bold,
    press,
    medium,

    ...rest
  } = props;

  const TextStyle: any = [
    style,
    styles.text,

    // color
    color && { color },
    accent && styles.accent,
    gray && styles.gray,
    blue && styles.blue,
    yellow && styles.yellow,
    red && styles.red,
    green && styles.green,

    // font sizes
    caption && styles.caption,
    h1 && styles.h1,
    size && { fontSize: size },
    center && { textAlign: 'center' },

    //Open_Sans
    extra_bold && styles.extra_bold,
    semi_bold && styles.semi_bold,

    // font weight
    bold && styles.bold,
    medium && styles.medium,

    // margins
    marginX && { marginLeft: marginX[0] || 0, marginRight: marginX[1] || 0 },
    marginY && { marginTop: marginY[0] || 0, marginBottom: marginY[1] || 0 },
  ];

  if (touchable) {
    return (
      <TouchableOpacity onPress={press}>
        <Text style={TextStyle} {...rest}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <Text style={TextStyle} {...rest}>
      {children}
    </Text>
  );
};

export default TextField;

const styles = StyleSheet.create({
  text: { fontFamily: 'Noto-regular' },
  // color
  accent: { color: theme.colors.accent },
  gray: { color: theme.colors.gray },
  blue: { color: theme.colors.blue },
  yellow: { color: theme.colors.yellow },
  green: { color: theme.colors.green },
  red: { color: theme.colors.red },

  // sizes
  caption: { fontSize: 15 },
  h1: { fontSize: theme.font.h1 },

  //noto_sans
  extra_bold: { fontFamily: 'NotoSans-ExtraBold' },
  medium: { fontFamily: 'NotoSans-Medium' },
  semi_bold: { fontFamily: 'NotoSans-SemiBold' },
  bold: { fontFamily: 'NotoSans-Bold' },
});
