import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default function Main(props : any){
    
    const {
        style,
        children,
        animated,
        center,
        middle,
        flex,
        size,
        round,

        ...rest
    } = props

    const circleStyle = [
        style,
        styles.circle,

        center && {justifyContent: 'center'},
        middle && {alignItems: 'center'},

        round && {height: round, width: round, borderRadius: round},

        flex == false && { flex : 0},
        
    ];


    if(animated){
        return(
            <Animated.View  style={circleStyle} {...rest}>
                {children}
            </Animated.View>
        )
    }

    return(
        <View style={circleStyle} {...rest}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        height: 40,
        width: 40,
        borderRadius: 40,
    },
});