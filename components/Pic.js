import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const Pic = props =>{
    const {
        style,
        children,
        src,
        flex,
        size,
        
        ...rest
    } = props;


    const PicStyle = [
        style,
        flex == false && { flex: 0},
        flex && { flex: flex },
        styles.pic,
        size && {height: size[0], width: size[1]},
    ];

    return(
        <Image style={PicStyle} source={src} {...rest}/>
    )
    
}

export default Pic;

const styles = StyleSheet.create({
    pic : {
        resizeMode: 'contain',
    },// default style

});