import React from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import { theme } from '../constants'
import View from './View';

const { width, height } = Dimensions.get('window');
const IMAGE_SIZE_PERCENT = .30; // 10%



const Pic = props =>{
    const {
        style,
        children,
        src,
        flex,
        scale,
        green,

        // constant sizes
        medium,


        // theme
        profile_picture,


        ...rest
    } = props;

    const PicStyle = [
        flex == false && { flex: 0},
        flex && { flex: flex },
        styles.pic,

        // size
        scale && {height: scale, width: scale},
        profile_picture && styles.profile_picture,
        style,

    ];



    if(profile_picture && medium && green){
        return(
            <View center middle>

                <Image 
                source={require('../assets/image/profile_pic_green.png')}
                style={{position: 'absolute', resizeMode: 'contain', 
                    height: height * 0.30,
                    width: width * 0.30
                }}
                />
                <Image style={[PicStyle, {height: theme.width * .25, width: theme.width * .25, borderColor:theme.colors.green}]} source={src} {...rest}/>    
            </View>
        )
    }

    if(profile_picture && medium){
        return(
            <View center middle>

                <Image 
                source={require('../assets/image/profile_pic.png')}
                style={{position: 'absolute', resizeMode: 'contain', 
                    height: height * 0.30,
                    width: width * 0.30
                }}
                />
                <Image style={[PicStyle, {height: theme.width * .25, width: theme.width * .25}]} source={src} {...rest}/>    
            </View>
        )
    }

    if(profile_picture){
        return(
            <View center middle>
                      <Image 
                        source={require('../assets/image/profile_pic.png')}
                        style={{position: 'absolute', resizeMode: 'contain', 
                            height: height * 0.41,
                            width: width * 0.41,
                        }}
                        />
                        <Image style={[PicStyle]} source={src} {...rest}/>    
            </View>
        )

    }

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
        height: height * ((IMAGE_SIZE_PERCENT/2)+.005),// 10%    
        width: width * IMAGE_SIZE_PERCENT + 0.9 +11,// 10%
        borderRadius: width * IMAGE_SIZE_PERCENT,
        borderColor: '#F68025',
        marginBottom: 20,
        borderWidth: 2,
    }

});

