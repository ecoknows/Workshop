import React from 'react';
import Pic from './Pic';
import View from './View';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';


interface InputInterface{

}

function Input(props: InputInterface){
    return(
        <View>
            <TextInput
                placeholder='Password'
            />
            {/* <TouchableOpacity>
                <Pic  
                src={require('../assets/icons/icon-eye.png')}
                scale={30}
                />
            </TouchableOpacity>
             */}
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({

});