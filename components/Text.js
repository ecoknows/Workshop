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

    // color
    accent,

    // font size
    caption, 
    h1,
    size,

    // font weight
    bold,

    ...rest
    } = props;

    const TextStyle = [
        style,
        styles.text,

        // color
        accent && styles.accent,

        // font sizes
        caption && styles.caption,
        h1 && styles.h1,
        size && {fontSize: size},

        // font weight
        bold && styles.bold,

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

    // sizes
    caption: { fontSize: 15},
    h1: { fontSize: theme.font.h1},

    // weight
    bold: {fontWeight: 'bold'}

});