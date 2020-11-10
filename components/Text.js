import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../constants';


const TextField = props => {
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
    blue,
    yellow,
    red,

    // font size
    caption, 
    h1,
    size,

    //Open_Sans
    extra_bold,
    semi_bold,
    bold,

    ...rest
    } = props;

    const TextStyle = [
        style,
        styles.text,

        // color
        accent && styles.accent,
        gray && styles.gray,
        blue && styles.blue,
        yellow && styles.yellow,
        red && styles.red,

        // font sizes
        caption && styles.caption,
        h1 && styles.h1,
        size && {fontSize: size},

        //Open_Sans
        extra_bold && styles.extra_bold,
        semi_bold && styles.semi_bold,

        // font weight
        bold && styles.bold,

        // margins
        marginX && {marginLeft: marginX[0] || 0 ,marginRight: marginX[1] || 0 },
        marginY && {marginTop: marginY[0] || 0 ,marginBottom: marginY[1] || 0 }

    ];


    if(touchable){
        return(
            <TouchableOpacity onPress={props.press}>
                <Text style={TextStyle} {...rest} >{children}</Text>
            </TouchableOpacity>
        );
    }

    return(
        <Text style={TextStyle} {...rest} >{children}</Text>
    )
}

export default TextField;

const styles = StyleSheet.create({

    // color
    accent : {color: theme.colors.accent},
    gray: {color: theme.colors.gray},
    blue : {color: theme.colors.blue},
    yellow : {color: theme.colors.yellow},
    red : {color: theme.colors.red},

    // sizes
    caption: { fontSize: 15},
    h1: { fontSize: theme.font.h1},

    //open_sans
    extra_bold: {fontFamily:'OpenSans-extra-bold'},
    semi_bold: {fontFamily: 'OpenSans-semi-bold'},

    // weight
    bold: {fontFamily:'OpenSans-bold'}
    

});