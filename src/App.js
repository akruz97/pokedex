/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Routes />
          <Toast />
        </SafeAreaView>
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
