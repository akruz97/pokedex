/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Routes from './routes/Routes';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initializeApp } from 'firebase/app'
import { UserContext } from './context/UserContext';
import { getData, removeValue, storeData } from './storage/storage';
import auth from '@react-native-firebase/auth'
import LoadingView from './components/LoadingView';

GoogleSignin.configure({
  webClientId: '638486815985-p9jvpgea1kukkjngimkdi9kc23mrvj8i.apps.googleusercontent.com',
});

const firebaseConfig = {
  apiKey: "AIzaSyAyiIUsz1ropmeUAbevtcbIvrC1s_6pckc",
  authDomain: "pokedex-29ab0.firebaseapp.com",
  databaseUrl: "https://pokedex-29ab0-default-rtdb.firebaseio.com",
  projectId: "pokedex-29ab0",
  storageBucket: "pokedex-29ab0.appspot.com",
  messagingSenderId: "638486815985",
  appId: "1:638486815985:web:e07487ed0466ac1166f550"
};

initializeApp(firebaseConfig);

const App = () => {

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

    const user = React.useMemo(() => ({
        setAuthenticated,
        isAuthenticated
    }),  [ setAuthenticated, isAuthenticated ]);

    const getDataUser = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      setLoading(false);
      setAuthenticated(isSignedIn);
      if (isSignedIn){
        getCurrentUser();
      }
    }

    const getCurrentUser = async () => {
      const currentUser = await GoogleSignin.getCurrentUser();
      storeData('user', currentUser);
    };

    useEffect(() => {
      getDataUser();
    }, []);

    if(loading){
      return <LoadingView loading={loading} text="" />
    }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <UserContext.Provider value={user}>
          <SafeAreaView style={styles.container}>
            <Routes />
            <Toast />
          </SafeAreaView>
        </UserContext.Provider>
      </NavigationContainer>
   </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})


export default App;
