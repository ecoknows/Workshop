import React from 'react';
import {StyleSheet, Image} from 'react-native';
import { theme } from '../constants';
import View from './View';


const Pic = props =>{
    const {
        style,
        children,
        src,
        flex,
        scale,

        // constant sizes
        medium,


        // theme
        profile_picture,


        ...rest
    } = props;

    const PicStyle = [
        style,
        flex == false && { flex: 0},
        flex && { flex: flex },
        styles.pic,

        // size
        scale && {height: scale, width: scale},
        profile_picture && styles.profile_picture,

    ];

    return(
        <Image style={PicStyle} source={src} {...rest}/>
    )

    
}

export default Pic;

const styles = StyleSheet.create({
    pic : {
        resizeMode: 'cover'
    },// default style


    medium:{
        height: theme.size.meduim, 
        width: theme.size.meduim
    },

    profile_picture:{
        flex: 1,
        height: '100%',    
        width: '100%',
        borderRadius: 500,
    }

});

