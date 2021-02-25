import React, {useRef, useState, useEffect} from 'react'
import { StyleSheet, Animated,StatusBar, TouchableWithoutFeedback} from 'react-native';
import { theme } from '../constants';
import View from './View';
import Pic from './Pic';
import Text from './Text';
import {useDispatch, useSelector} from 'react-redux';
import {closeDrawerAction, openBottomDrawerAction} from '../redux';
import Skills from './Skills';

let is_drawer_open = false;

export default function Drawer(props) {
    const [hide, setHide] = useState(true);
    const drawer_anim = useRef(new Animated.Value(-theme.height * 0.55)).current;
    const {drawer} = useSelector( (state) => state.drawerState)
    const dispatch = useDispatch();

    const openDrawer =()=>{
        Animated.timing(drawer_anim,{
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }

    const closeDrawer =()=>{
        Animated.timing(drawer_anim,{
            toValue: -theme.height * 0.55,
            duration: 1000,
            useNativeDriver: true
        }).start(({finished})=>{
            setHide(true);
        });
    }

    const handleClose =()=>{
        dispatch(closeDrawerAction());
    }

    const openBottomDrawer=(tabSelected)=>{
        dispatch(openBottomDrawerAction({status: true,tabSelected}))
    }

    useEffect(() => {
        if(!hide){
            openDrawer();
        }
    }, [hide])


    if(drawer && !is_drawer_open){
        setHide(false);
        is_drawer_open = true;
    }

    if(!drawer && is_drawer_open){
        closeDrawer();
        is_drawer_open = false;
    }



    if(hide)
        return null

    return (
        <View style={styles.container}>
            <Fade drawer_anim={drawer_anim} handleClose={handleClose}/>
            <DrawerView drawer_anim={drawer_anim} handleClose={handleClose} openBottomDrawer={openBottomDrawer}/>
        </View>
    )
}

function Fade({drawer_anim, handleClose}){
    return(
        <TouchableWithoutFeedback onPress={handleClose}>
                <View animated flex={false} style={[styles.fade, {
                            opacity: drawer_anim.interpolate({
                                inputRange: [0, theme.width * .65],
                                outputRange: [1, 0],
                                extrapolate: 'clamp'
                            })
                            }
                    ]}/>
        </TouchableWithoutFeedback>
    )
}

function DrawerView({drawer_anim,handleClose,openBottomDrawer}){
    return(
        <View animated flex={false} style={[styles.drawerView,
            {transform:[{
                translateY: drawer_anim
            }]}
        
        ]}>

            <View flex={false}  middle center>
                
                <Pic 
                src={require('../assets/image/user/man.png')}
                profile_picture 
                />

                <Text extra_bold gray size={17}> 
                Jerico C. Villaraza
                </Text>
                <Text medium size={12} gray> 
                Manila, Philippines
                </Text>


                <View flex={false} style={{width: '90%'}} center middle>
                    <Skills 
                        skills={['Manager', 'Enterprenuer', 0]}
                        size={10}
                        iconScale={13}
                        add
                        />
                </View>
                <View flex={false} center middle style={{marginTop: 20}}>
                    <Text semi_bold size={16} gray touchable press={() => openBottomDrawer(0)}> Edit Profile </Text>
                    <Text semi_bold size={16} gray touchable press={() => openBottomDrawer(1)}> Messages </Text>
                    <Text semi_bold size={16} gray touchable press={() => openBottomDrawer(2)}> Workers </Text>
                    <Text semi_bold size={16} gray touchable press={() => openBottomDrawer(3)}> Applicants </Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        height: '100%',
        width:'100%',
    },
    fade:{
        backgroundColor:'rgba(0,0,0,0.4)',
        height: '100%',
        width:'100%',
    },
    drawerView:{
        position:'absolute',
        right:0,
        backgroundColor:'white',
        height: '55%',
        width:'65%',
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        borderTopStartRadius: 40,
        paddingTop: StatusBar.currentHeight + 5,
        paddingLeft: 10,
    },
});
