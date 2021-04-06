import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Alert,
} from 'react-native' 


const dummy = {
    email:'albertjohntulop@gmail.com',
    isVerified: false
}

const EmailInfoCard = ({email,isVerified}) =>{

    return(
            <View style={styles.container}>            
                <Text style={styles.text}>Primary Email Address</Text>
                <View style={styles.row}>
                    {dummy.isVerified ? (
                            <Image source={require('../../assets/state-icons/check.png')} style={{marginLeft:20}}/>
                        ):(
                            <Image source={require('../../assets/state-icons/cross.png')} style={{marginLeft:20}}/>
                        )
                    }
                    <Text style={styles.email}>{dummy.email}</Text>
                </View>
                <View style={[{alignItems:'flex-start',marginLeft:80}]}>
                    <View style={[styles.row,{marginTop: -15,height: 20,}]}>
                        {dummy.isVerified ? 
                            <Text style={[styles.text,{fontStyle:'italic'}]}>Verified</Text>
                            :
                            <Text style={[styles.text,{fontStyle:'italic'}]}>Not Verified</Text>
                        }
                        <View style={{borderRightColor: 'black', borderRightWidth: 1, marginHorizontal: 5,height: 15,alignSelf:'center'}}/>
                        <Text style={[styles.text,{fontStyle:'italic',color:'orange'}]} onPress = {()=>Alert.alert("Resent Verification clicked.")}>Resend Verification</Text>
                    </View>
                </View>
            </View>
    )
}
export default EmailInfoCard;

const styles = StyleSheet.create({
    container:{
        flex: .4,
        marginHorizontal: 20,
        // backgroundColor:'yellow'
    },
    row:{
        marginTop:10,
        height: 40,
        flexDirection:'row'
    },
    text:{
        fontSize:14,
        color:'#4F4F4F'
    },
    email:{
        flex:1,
        textAlign:'center',
        fontSize:18,
        fontWeight:'bold',
        color:'#4F4F4F'
    },
    
})