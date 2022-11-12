import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Pressable } from '@react-native-material/core'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title, showBack = false }) => {

  const navigation = useNavigation();

  return (
    <View style={{
      flexDirection: 'row',

        alignItems: 'center'
    }}>
      {
        showBack ? (
          <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <MaterialIcons name='arrow-back' size={30} />
        </Pressable>
        ) : null
      }
      <Text style={styles.title}>{ title }</Text>
    </View>

  )
}

export default Header