import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { Badge, Pressable, Surface } from '@react-native-material/core'
import { getPokemonById } from '../../../services'
import pokemonColors from '../../../util/pokemonColors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const PokemonInfo = ({ pokemon, deletePokemon }) => {

    const [info, setInfo] = useState({});

    useEffect(() => {
        getPokemonById(pokemon.pokemonId)
        .then(res => res.data)
        .then(data => {
            setInfo(data);
        })
    }, []);

  return (
    <Surface 
         elevation={6}
        category="medium"
        style={[styles.container, { backgroundColor: info?.types ? pokemonColors[info.types[0].type.name] : '#FFF' }]}>
       <Pressable style={{
        position: 'absolute',
        bottom: 0,
        right: 0
       }} onPress={() => {
        deletePokemon(pokemon.pokemonId)
       }} >
        <MaterialCommunityIcons name='close-box' size={28} />

       </Pressable>
       
       <View style={{
            height: '70%',
            flexDirection: 'row'
       }}>
        <View style={{
                width: '50%',
                height: '100%'
        }}>
            <Image source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemon.pokemonId +'.png', cache: 'force-cache' }} 
                                style={styles.image}/>
        </View>
            <View style={{
                marginVertical: 8
            }}>
                <Text style={styles.height} >Alt:  {parseFloat((info.height)*0.1).toFixed(1)} m</Text>
                <Text style={styles.weight}>Peso:  {info.weight} lbs</Text>
                {
                    info.types ?  (
                        <>
                            {
                                info.types.map(item => <Text key={item.type.name} style={styles.badge} > * {item.type.name}</Text>)
                            }
                        </>

                    ) : undefined
                }
                
            </View>
       </View>
       <View style={{ height: '30%' }}>
        <Text style={styles.name}>{info.name}</Text>

       </View>
    </Surface>
  )
}

export default PokemonInfo