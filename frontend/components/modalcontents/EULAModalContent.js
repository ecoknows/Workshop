import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native' 


const PrivacyPolicyModalContent = () =>{
    
    return(
        <View style={styles.container}>            
            <View style={styles.profile}>
                <Image source={require('../../assets/settings/connection1.png')} style={styles.img} />
            </View>
            <View style={styles.title}>
                <Text style={styles.text}>End User License Agreement</Text>
                <Text style={styles.normalText}>This End User License Agreement (the "EULA") is a binding legal agreement between you, as an individual or entity, and LinkedIn Corporation ("LinkedIn"). By downloading, installing, or using this application for Android, iOS or other mobile platform, as applicable (the "Software"), you agree to be bound by the terms of this EULA. If you do not agree to the EULA, do not check the "I accept the terms" box and do not use the Software.</Text>
                
            </View>



            <View style={styles.square}>
                <Text style={[styles.normalText,{fontSize:13,marginLeft:0}]}>You agree that installation or use of the Software signifies that you have read, understood, and agree to be bound by the EULA.</Text>
                <Text style={[styles.normalText,{fontSize:13,marginLeft:0}]}>The Software is provided to you under this EULA solely for your private, non-commercial use. Use of the Software or of the Workshop content, information, membership functionality, job search, recruiting, marketing, sales or any other services (“Workshop Service”) within an organization or the use of multiple copies of the Software (except a back-up copy) requires a commercial license for the Software.</Text>
            </View>
        </View>
    )
}

export default PrivacyPolicyModalContent;

const styles = StyleSheet.create({
    container:{
        flex:.8,
        width:'100%',
        // backgroundColor:'yellow'
    },
    profile:{
        alignItems:'center',
    },
    img:{
        marginTop:30,
        height:100, 
        width:100,
        
    },
    title:{
        marginTop:20,
        alignItems:'flex-start',
        // backgroundColor:'red'
    },
    square:{
        alignSelf:'center',
        backgroundColor:'#F1F1F1',
        padding: 10,
        width: '80%',
        marginTop: 10
        
    },
    text:{
        fontSize: 18,
        color: '#4F4F4F',
        fontWeight:'bold',
        marginVertical: 10
    },
    normalText:{
        fontSize: 14,
        color: '#4F4F4F',
        // margin: 5,
        marginLeft: 20
    },
    textInput:{
        textAlignVertical: 'top',
        width:'90%',
        height:85,
        borderWidth:1,
        borderColor:'black',
        opacity: .34,
        padding:10   
    }
})