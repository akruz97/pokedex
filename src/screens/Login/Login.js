import { View, Text, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import styles from './styles'
import { TextInput } from "@react-native-material/core";
import { Button } from "@react-native-material/core";
import auth from '@react-native-firebase/auth';
import { GoogleSigninButton, GoogleSignin } from '@react-native-google-signin/google-signin';
import { UserContext } from '../../context/UserContext';
import { storeData } from '../../storage/storage';
import { reportCrash } from '../../services';


const Login = () => {

  const { isAuthenticated, setAuthenticated } = useContext(UserContext);

  const onGoogleButtonPress = async () => {

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const { idToken } = await GoogleSignin.signIn();
  
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    auth().signInWithCredential(googleCredential).then(async () => {
      getCurrentUser();
      setAuthenticated(true);
    }).catch(error => {
      reportCrash(error);
    });
  }

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    storeData('user', currentUser);
  };

  return (
    <ImageBackground source={require('./../../assets/img/launcher.png')}  style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.title} >{`Pokedex App`}</Text>
        
        <View>
          <Text style={styles.text}>{`Arma tu equipo ganador!. Selecciona los mejores pokemon de la región`}</Text>
        <GoogleSigninButton 
          style={{ width: '100%', height: 55, marginVertical: '10%' }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => onGoogleButtonPress()}
        />
        </View>
      </View>
    </ImageBackground>
  )
}

export default Login