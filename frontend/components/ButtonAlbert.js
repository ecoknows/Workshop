import React from 'react'

import { 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    Alert
} from 'react-native'

const Button = ({title,onPress}) => {
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.textStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    button:{
        alignItems:'center',
        justifyContent:'center',
        height: 30,
        width: 120,
        borderColor:'orange',
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor:'white',
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 100,
        elevation: 1,
    },
    textStyle:{
        fontSize: 14,
        color: '#F79040',
    }
})