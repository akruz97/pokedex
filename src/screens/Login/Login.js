import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { TextInput } from "@react-native-material/core";
import { Button } from "@react-native-material/core";
import auth from '@react-native-firebase/auth';
import { GoogleSigninButton, GoogleSignin } from '@react-native-google-signin/google-signin';


const Login = () => {

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential).then(() => {
      console.log('Sign in success!');
    }).catch(error => {
      console.log(error.message);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <GoogleSigninButton 
          style={{ width: '100%', height: 55 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
      </View>
    </View>
  )
}

export default Login