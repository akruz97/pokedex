import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
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

    const [isAuthenticated, setAuthenticated] = useState(false);

    const onAuthStateChanged = (user) => {
        if (user) {
            console.log('User : ', JSON.stringify(user, null, 4));
            setAuthenticated(true);
        }
      }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    

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