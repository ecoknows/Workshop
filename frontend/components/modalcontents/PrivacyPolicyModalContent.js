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
                <Image source={require('../../assets/settings/privacy-policy2.png')} style={styles.img} />
            </View>
            <View style={styles.title}>
                <Text style={styles.text}>Your Privacy Matters!</Text>
                <Text style={styles.normalText}>In Workshop, you give us certain of information voluntarily which is used to connect you to potential employers. We ensure the transparency in which your data is used.</Text>
                <Text style={styles.normalText}>This Privacy Policy applies when you use our services.</Text>
            </View>

            <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:'#F68025',opacity:.4,marginTop: 10,}}/>

            <View style={styles.title}>
                <Text style={[styles.text,{fontSize:14}]}>Information Collection and Use</Text>
                <Text style={[styles.normalText,{fontSize:13}]}>For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.</Text>
            </View>

            <View style={styles.title}>
                <Text style={[styles.text,{fontSize:14}]}>Safeguarding and Securing the Data</Text>
                <Text style={[styles.normalText,{fontSize:13}]}>Workshop is committed to securing your data and keeping it confidential. Workshop has done all in its power to prevent data theft, unathorized access, and disclosure by implementing latest technologies and software, which helps us safeguard all the information we collect online.</Text>
            </View>
        </View>
    )
}

export default PrivacyPolicyModalContent;

const styles = StyleSheet.create({
    container:{
        flex:.85,
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
    text:{
        fontSize: 18,
        color: '#4F4F4F',
        fontWeight:'bold',
        marginVertical: 10
    },
    normalText:{
        fontSize: 14,
        color: '#4F4F4F',
        margin: 5,
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