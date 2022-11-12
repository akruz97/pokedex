import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import RegionList from './RegionList'
import Header from '../../components/Header'

const Home = () => {
  return (
    <View style={styles.container}>
        <Header title={'Regiones pokemon'} />
        <Text style={styles.title} >Seleccione una región y arma tu equipo!</Text>
        <RegionList />
    </View>
  )
}

export default Home