import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './styles'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Button } from '@react-native-material/core'
import auth from '@react-native-firebase/auth';
import { UserContext } from '../../context/UserContext'
import { getData, removeValue } from '../../storage/storage'
import LoadingView from '../../components/LoadingView'
import Header from '../../components/Header'
import { reportCrash } from '../../services'
const Profile = () => {

  const { isAuthenticated, setAuthenticated } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const signOut = async () => {
    try {
      setLoading(true);
      GoogleSignin.signOut().then(() => {
        setTimeout(() => {
          removeValue('user');
          setAuthenticated(false);
        }, 1500);
       
      }).catch(error => {
        setAuthenticated(false);
        reportCrash(error);
      })
      
    } catch (error) {
      reportCrash(error);
    }
  };

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const userInfo = await getData('user');
    if(userInfo) setCurrentUser(userInfo);
  }

  if(loading){
    return <LoadingView loading={loading} text="" />
  }

  return (
    <View style={styles.container}>
      <Header title={'Perfil'} />
     <View style={{ flex: 1, justifyContent: 'space-between' }}>
         <View>
            <Image source={{ uri: currentUser.user?.photo }} style={styles.photo} />
              <Text style={styles.text} >{ currentUser.user?.name }</Text>
              <Text style={styles.text} >{ currentUser.user?.email }</Text>
          </View>
      <Button title='Cerrar sesión' 
        style={styles.btn}
      onPress={() => signOut()} />
     </View>
    </View>
  )
}

export default Profile