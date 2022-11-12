import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import PokemonItem from '../PokemonItem';

export default function PokemonList({ data, pokemonsSelected, onChange }) {

    const renderItem = ({ item }) => {
        return <PokemonItem item={item} pokemonsSelected={pokemonsSelected} onChangePokemon={onChange} />
    }

  return (
    <View style={styles.container}>
        <FlatList 
            data={data}
            keyExtractor={({ pokemon_species }) => pokemon_species.name}
            renderItem={renderItem}
        />
    </View>
  )
}