import { View, Text } from 'react-native'
import React from 'react'
import styles from '../FormTeam/styles'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Button } from '@react-native-material/core'
import auth from '@react-native-firebase/auth';
const Profile = () => {

  const signOut = async () => {
    try {
      auth()
      .signOut()
      .then(() => console.log('User signed out!'));
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title='Cerrar sesión' variant='outlined' onPress={() => signOut()} />
    </View>
  )
}

export default Profile