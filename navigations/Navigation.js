import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text, Image, StyleSheet } from 'react-native';

import {
    JobSearch,
    Profile,
    Notifications,
} from '../screens';


import { theme } from '../constants';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function UserScreen_BottomNavigation({navigation}){
    const [active, setActive] = useState('Profile');

    return(
        <Tab.Navigator
                  
        tabBarOptions={{

            style: {				
                elevation: 0,
                borderTopWidth: 0,
            },
            tabStyle:{
                height: 50,
            }
        }}
        >

            <Tab.Screen name="Profile" component={Profile} 
             listeners={{
                tabPress: e => {
                    setActive('Profile')
                },
                }}
            options={{
                tabBarLabel: () => <Text style={[styles.text,{color: active == 'Profile' ?  theme.colors.accent: 'black'}]}>Profile</Text>,
                tabBarIcon: ({ color, size }) => (
                    <Image source={(active == 'Profile' )? require('../assets/icons/profile_click.png') : require('../assets/icons/profile.png')}
                     resizeMode='cover'
                      style={styles.icon}
                    />
                ),
            }}
            />
            <Tab.Screen name="JobSearch" component={JobSearch} 
             listeners={{
                tabPress: e => {
                    setActive('JobSearch')
                },
                }}
            options={{
                tabBarLabel: () => <Text style={[styles.text,{color: active == 'JobSearch' ?  theme.colors.accent: 'black'}]} >Job</Text>,
                tabBarIcon: ({ color, size }) => (
                  <Image source={(active == 'JobSearch' )? require('../assets/icons/jobsearch_click.png') : require('../assets/icons/jobsearch.png')}
                   resizeMode='cover'
                    style={styles.icon}
                  />
                ),
            }}
            />
            <Tab.Screen name="Notifications" component={Notifications} 
             listeners={{
                tabPress: e => {
                    setActive('Notifications')
                },
                }}
            options={{
                tabBarLabel: () => <Text style={[styles.text,{color: active == 'Notifications' ?  theme.colors.accent: 'black'}]}>Notifications</Text>,
                tabBarIcon: ({ color, size }) => (
                    <Image source={(active == 'Notifications' )? require('../assets/icons/notifications_click.png') : require('../assets/icons/notifications.png')}
                     resizeMode='cover'
                      style={styles.icon}
                    />
                ),
            }}
            />

        </Tab.Navigator>
    );
}

function Navigation({navigation}){
    return(
        <NavigationContainer>
            <Stack.Navigator mode='modal' >
                <Stack.Screen name='UserScreen' component={UserScreen_BottomNavigation}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;

const styles = StyleSheet.create({
    icon : {
        height: 30,
        width: 30,
    },
    text:{
        fontSize: 10,
        marginBottom: 5
    }
});