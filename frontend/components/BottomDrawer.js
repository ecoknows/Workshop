import React, {useRef, useState, useEffect} from 'react'
import { StyleSheet, Animated,StatusBar, TouchableWithoutFeedback, FlatList} from 'react-native';
import { theme } from '../constants';
import View from './View';
import Pic from './Pic';
import Text from './Text';
import {useDispatch, useSelector} from 'react-redux';
import {closeBottomDrawerAction} from '../redux';



const data = [
    {name: 'Chevy Quitquitan', latestMessage: 'We have a problem...',workers:true},
    {name: 'Camry Villaraza', latestMessage: 'Hello I want to apply...',workers:false},
    {name: 'John Smith', latestMessage: 'Good afternoon sir...',workers:true},
    {name: 'Elon Musk', latestMessage: 'Can we talk about th..',workers:true},
]

let is_drawer_open = false;

export default function BottomDrawer(props) {
    const [hide, setHide] = useState(true);

    const drawer_anim = useRef(new Animated.Value(theme.height)).current;

    const {bottomDrawer} = useSelector( (state) => state.bottomDrawerState)

    const dispatch = useDispatch();

    const UserChoice = check_user_choice(bottomDrawer.tabSelected);

    
    const openDrawer =()=>{
        Animated.timing(drawer_anim,{
            toValue: theme.height * UserChoice.anim_treshold,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }

    const closeDrawer =()=>{
        Animated.timing(drawer_anim,{
            toValue: theme.height,
            duration: 1000,
            useNativeDriver: true
        }).start(({finished})=>{
            setHide(true);
        });
    }

    const handleClose =()=>{
        dispatch(closeBottomDrawerAction({status: false, tabSelected: bottomDrawer.tabSelected}));
    }

    useEffect(() => {
        if(!hide){
            openDrawer();
        }
    }, [hide])


    if(bottomDrawer.status && !is_drawer_open){
        setHide(false);
        is_drawer_open = true;
    }

    if(!bottomDrawer.status && is_drawer_open){
        closeDrawer();
        is_drawer_open = false;
    }



    if(hide)
        return null

    return (
        <View style={styles.container}>
            <Fade drawer_anim={drawer_anim} handleClose={handleClose} anim_treshold={UserChoice.anim_treshold}/>
            <TabSelectedView tabSelected={bottomDrawer.tabSelected} drawer_anim={drawer_anim} handleClose={handleClose} UserChoice={UserChoice}/>
        </View>
    )
}

function Fade({drawer_anim, handleClose, anim_treshold}){
    return(
        <TouchableWithoutFeedback onPress={handleClose}>
                <View animated style={[styles.fade, {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            opacity: drawer_anim.interpolate({
                                inputRange: [theme.height * anim_treshold, theme.height],
                                outputRange: [1, 0],
                                extrapolate: 'clamp'
                            })
                            }
                    ]}/>
        </TouchableWithoutFeedback>
    )
}

function check_user_choice(code){
    switch(code){
        case 0:
            return {
                anim_treshold: .5,
                height_percentage: '50%',
            }
        case 1:
            return {
                anim_treshold: .1,
                height_percentage: '90%',
            }
        case 2:
            return {
                anim_treshold: .1,
                height_percentage: '90%',
            }
        case 3:
            return {
                anim_treshold: .1,
                height_percentage: '90%',
            }
    }
}

function TabSelectedView({tabSelected,drawer_anim,handleClose, UserChoice}){

    console.log(tabSelected,  " kurono");
    switch(tabSelected){
        case 0: 
            return <EditProfile drawer_anim={drawer_anim} handleClose={handleClose} UserChoice={UserChoice}/>
        case 1: 
            return <Messages drawer_anim={drawer_anim} handleClose={handleClose} UserChoice={UserChoice}/>
        case 2: 
            return <Workers drawer_anim={drawer_anim} handleClose={handleClose} UserChoice={UserChoice}/>
        case 3: 
            return <Applicants drawer_anim={drawer_anim} handleClose={handleClose} UserChoice={UserChoice}/>
        default: 
            return null; // Return Error I think ? or loading page
    }
}


function EditProfile({drawer_anim,handleClose, UserChoice}){
    return(
        <View animated style={[styles.drawerView,
            {
                height: UserChoice.height_percentage,
                transform:[{
                translateY: drawer_anim
            }]}

        
        ]}>
            <View>
                <Text bold size={21} color='#65676A' style={{alignSelf:'center', marginBottom: 20}}>Personal Information</Text>

                <Pic 
                src={require('../assets/image/user/man.png')}
                profile_picture 
                />
                
                <View row paddingHorizontal={10}>
                    <View flex>
                        <Text extra_bold gray size={20}>Name</Text>
                        <Text medium gray>Jerico C. Villaraza</Text>
                        <Text extra_bold gray size={20}>Address</Text>
                        <Text>Manila, Philippines</Text>
                    </View>

                    <View flex>
                        <Text extra_bold gray size={20}>Birthday</Text>
                        <Text medium gray>December 2, 1999</Text>
                        <Text extra_bold gray size={20}>Sex</Text>
                        <Text medium gray>Male</Text>
                    </View>

                </View>

            </View>
        </View>
    )
}



function Messages({drawer_anim,handleClose, UserChoice}){
    return(
        <View animated style={[styles.drawerView,
            {
                height: UserChoice.height_percentage,
                transform:[{
                translateY: drawer_anim
            }]}

        
        ]}>
            <View middle center>
                <Text bold size={21} color='#65676A'>Messages</Text>
                <View row center middle style={{marginBottom: 15}}>
                    <View style={{height: 8, width: 8, backgroundColor:theme.colors.accent, borderRadius:30, marginRight: 5}}/>
                    <Text style={{marginRight: 10}}>workers</Text>
                    <View style={{height: 8, width: 8, backgroundColor:theme.colors.green, borderRadius:30, marginRight: 5}}/>
                    <Text>applicants</Text>
                </View>
                <View row>
                    <FlatList
                        data={data}
                        numColumns={2}
                        renderItem={({item,index})=>(
                            <View style={{width:'50%',height: theme.height * .3, justifyContent:index % 2 != 0 ? 'flex-end' : 'flex-start'}}>
                                <Pic 
                                    src={require('../assets/image/user/man.png')}
                                    profile_picture 
                                    green={!item.workers}
                                    medium
                                />
                                <Text extra_bold gray size={17} style={{textAlign:'center'}}>{item.name}</Text>
                                <Text medium gray size={13} style={{textAlign:'center'}}>{item.latestMessage}</Text>
                            </View>
                        )}
                        keyExtractor={(item,index) => index.toString()}
                    />
                </View>
            </View>
        </View>
    )
}




function Workers({drawer_anim,handleClose, UserChoice}){
    return(
        <View animated style={[styles.drawerView,
            {
                height: UserChoice.height_percentage,
                transform:[{
                translateY: drawer_anim
            }]}

        
        ]}>
            <View middle center>
                <Text bold size={21} color='#65676A'>Workers</Text>
            </View>
        </View>
    )
}




function Applicants({drawer_anim,handleClose, UserChoice}){
    return(
        <View animated style={[styles.drawerView,
            {
                height: UserChoice.height_percentage,
                transform:[{
                translateY: drawer_anim
            }]}

        
        ]}>
            <View middle center>
                <Text bold size={21} color='#65676A'>Applicants</Text>
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
        height: '100%',
        width:'100%',
    },
    drawerView:{
        position:'absolute',
        right:0,
        backgroundColor:'white',
        width:'100%',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderWidth:2,
        borderColor: '#FF900D',
        paddingTop: 15,
    },
});
