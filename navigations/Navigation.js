import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text, Image, StyleSheet } from 'react-native';

import {
    JobSearch,
    Profile,
    JobProfile,
    EmployerStatus,
    EmployeeStatus,
    Notifications,
    InfoSlide,
    Login,
    SignUp,
    WorkerProfile,
} from '../screens';


import { theme } from '../constants';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function User_BottomNavigation({navigation}){
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

function Employee_BottomNavigation({navigation}){
    const [active, setActive] = useState('Employee');

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

            <Tab.Screen name="Employee" component={EmployeeStatus} 
             listeners={{
                tabPress: e => {
                    setActive('Employee')
                },
                }}
            options={{
                tabBarLabel: () => <Text style={[styles.text,{color: active == 'Profile' ?  theme.colors.accent: 'black'}]}>Employee</Text>,
                tabBarIcon: ({ color, size }) => (
                    <Image source={(active == 'Employee' )? require('../assets/icons/employee_click.png') : require('../assets/icons/employee.png')}
                     resizeMode='cover'
                      style={styles.icon}
                    />
                ),
            }}
            />
            <Tab.Screen name="Employer" component={EmployerStatus} 
             listeners={{
                tabPress: e => {
                    setActive('Employer')
                },
                }}
            options={{
                tabBarLabel: () => <Text style={[styles.text,{color: active == 'Employer' ?  theme.colors.accent: 'black'}]} >Employer</Text>,
                tabBarIcon: ({ color, size }) => (
                  <Image source={(active == 'Employer' )? require('../assets/icons/employer_click.png') : require('../assets/icons/employer.png')}
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
                <Stack.Screen name='InfoSlide' component={InfoSlide}
                    options={{
                        headerShown: false,
                    }}
                />
                
                <Stack.Screen name='UserScreen' component={User_BottomNavigation}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen name='Login' component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                
                <Stack.Screen name='SignUp' component={SignUp}
                    options={{
                        headerShown: false,
                    }}
                />
                
                <Stack.Screen name='JobProfile' component={JobProfile}
                    options={{
                        headerShown: false,
                    }}
                />
                
                <Stack.Screen name='Employee' component={Employee_BottomNavigation}
                    options={{
                        headerShown: false,
                    }}
                />

                
                <Stack.Screen name='WorkerProfile' component={WorkerProfile}
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