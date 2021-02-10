import React, {useRef, useState, useEffect} from 'react'
import { StyleSheet, Animated,StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { theme } from '../constants';
import View from './View';
import Pic from './Pic';
import Text from './Text';
import {useDispatch, useSelector} from 'react-redux';
import {closeDrawerAction} from '../redux';
import {BoxShadow} from 'react-native-shadow'

let is_drawer_open = false;

const shadowOpt = {
    width:theme.width * .51,
    height:theme.height * .17,
    color:"#000",
    border:10,
    radius:12,
    opacity:0.2,
    x:0,
    y:3,
    style:{alignItems:'center'}
}

export default function Drawer(props) {
    const [hide, setHide] = useState(true);
    const drawer_anim = useRef(new Animated.Value(theme.width * .65)).current;
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
            toValue: theme.width * .65,
            duration: 1000,
            useNativeDriver: true
        }).start(({finished})=>{
            setHide(true);
        });
    }

    const handleClose =()=>{
        dispatch(closeDrawerAction());
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
            <DrawerView drawer_anim={drawer_anim} handleClose={handleClose}/>
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

function DrawerView({drawer_anim,handleClose}){
    return(
        <View animated flex={false} style={[styles.drawerView,{transform:[{
            translateX: drawer_anim
        }]}]}>

            <View flex={2}  middle center>
                
                <Pic 
                src={require('../assets/temp_image/john_smith.png')}
                profile_picture 
                />
                <Text extra_bold gray size={17}> 
                        Russel Johnson 
                </Text>
                <Text bold blue size={14} marginY={[5,5]}> 
                        Employer
                </Text>
                <View flex={false} row>
                    <View center middle>
                        <Text bold yellow size={14}> 
                        LOCATION
                        </Text>
                        <Text semi_bold size={14}> 
                        Manila
                        </Text>
                    </View>       
                    <View center middle> 
                        <Text bold yellow size={14}> 
                        AUTHORIZED
                        </Text>
                        
                        <Text red semi_bold size={14}> 
                        Scam
                        </Text>
                    </View>
                </View>
            </View>




            <View flex={1} middle>
                <View>
                    <TouchableOpacity style={{alignItems: 'center', flexDirection:'row', marginBottom: 10}}>
                            <Pic
                                src={require('../assets/icons/bubble_message.png')}
                                style={styles.icon}
                            />
                            <Text  bold size={17} color='#917C7C'>Messages</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{ alignItems: 'center', flexDirection:'row'}}>
                            <Pic
                                src={require('../assets/icons/history.png')}
                                style={styles.history}
                            />
                            <Text  bold size={17} color='#917C7C'>History</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View flex={3} middle>
                <TouchableOpacity>

                    <BoxShadow setting={shadowOpt}>
                        <View style={styles.boxshadow}>
                            <View flex={2}>
                                <Pic
                                    src={require('../assets/temp_image/ajinomoto.png')}
                                    style={{height:'100%', width: '100%',
                                    borderTopRightRadius: 20,
                                    borderTopLeftRadius: 20,
                                    }}
                                />
                            </View>
                            <View>

                            </View>
                        </View>
                    </BoxShadow>
                </TouchableOpacity>

            </View>
            

            <View flex={false} absolute style={{marginTop:StatusBar.currentHeight + 5, marginLeft: 10}}>
                <TouchableOpacity onPress={handleClose}>
                    <Pic
                        src={require('../assets/icons/x.png')}
                        style={styles.close}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Pic
                        src={require('../assets/icons/edit.png')}
                        style={styles.close}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        height: '100%',
        width:'100%'
    },
    boxshadow: {
        width:'105%',
        backgroundColor:'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
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
        height: '100%',
        width:'65%',
        paddingTop: StatusBar.currentHeight + 5,
        paddingLeft: 10,
    },
    close:{
        height: 30,
        width: 30,
    },
    icon:{
        resizeMode:'contain',
        height: 45,
        width: 45,
        marginRight: 5,
    },
    history:{
        resizeMode:'contain',
        height: 38,
        width: 38,
        marginRight: 5,
    }
});
