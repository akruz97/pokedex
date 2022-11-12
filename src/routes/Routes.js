import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import auth from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Teams from '../screens/Teams';
import Profile from '../screens/Profile';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Pokemons from '../screens/Pokemons';
import FormTeam from '../screens/FormTeam';
import { UserContext } from '../context/UserContext';
import { removeValue, storeData } from '../storage/storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabMenu = () => {


    return (
        <Tab.Navigator>
            <Tab.Screen name='Locations' component={Home}  
                    options={{ headerShown: false, 
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused, color, size }) => 
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    }} />
            <Tab.Screen name='Teams' component={Teams}     
                    options={{ headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused, color, size }) => 
                        <MaterialCommunityIcons name="account-group" color={color} size={size} />
                    }} />
            <Tab.Screen name='Profile' component={Profile} 
                    options={{ headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused, color, size }) => 
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    }}/>
        </Tab.Navigator>
    )
}


const Routes = () => {

    const user = useContext(UserContext);
    const { isAuthenticated, setAuthenticated, loading } = user;
    

  return (
    (isAuthenticated) ? (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={TabMenu} options={{ headerShown: false }} />
            <Stack.Screen name='Pokemons' component={Pokemons} options={{ headerShown: false }} />
            <Stack.Screen name='FormTeam' component={FormTeam} options={{ headerShown: false }} />
        </Stack.Navigator>
    ) : (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
  )
}

export default Routes