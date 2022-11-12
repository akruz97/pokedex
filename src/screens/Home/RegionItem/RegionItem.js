import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { ListItem, Pressable, Surface } from '@react-native-material/core'
import { useNavigation } from '@react-navigation/native'
import regionColors from '../../../util/regionColors'

const RegionItem = ({ item }) => {

    const navigation = useNavigation();

    const goPokemons = () => {
        navigation.navigate('Pokemons', {
            region: item
        })
    }

  return (
    <Surface
        elevation={5}
        category="large"
        style={[styles.container, { backgroundColor: regionColors[item.name] ? regionColors[item.name] : regionColors['default'] } ]}>
        <Pressable style={styles.pressable} onPress={() => goPokemons(item)} >
            <Text style={styles.text} >Región {item.name}</Text>
        </Pressable>
    </Surface>
   
  )
}

export default RegionItem