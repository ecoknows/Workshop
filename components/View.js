import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

const ViewField = props => {
    const {
    style,
    children,

    // position
    center,
    middle,

    // behaviour
    touchable,

    // flex
    flex,
    row,

    //colr
    white,

    ...rest
    } = props;

    const ViewStyle = [
        style,
        styles.view,

        // flex
        row && styles.row,
        flex == false && { flex: 0},
        flex && {flex: flex},

        // position
        center && {justifiyContent: 'center'},
        middle && {alignItems: 'center'},

        //color
        white && styles.white,
        
    ];


    if(touchable){
        return(
        <View style={ViewStyle} {...rest} >
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={props.press}>
                {children}
            </TouchableOpacity>
        </View>
        );
    }

    return(
        <View style={ViewStyle} {...rest} >{children}</View>
    )
}

export default ViewField;

const styles = StyleSheet.create({
    view : {
        flex: 1,
    },// default text 


    row: { flexDirection: 'row'},

    //colors 

    white: {backgroundColor: 'white'},
});