import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { ListItem, Pressable, Surface } from '@react-native-material/core'
import { useNavigation } from '@react-navigation/native'
import CheckBox from '@react-native-community/checkbox'

const PokemonItem = ({ item, pokemonsSelected, onChangePokemon }) => {

    const { entry_number, pokemon_species } = item;
    const { name, url } = pokemon_species;
    const navigation = useNavigation();
    const pokemonId = String(url).split('https://pokeapi.co/api/v2/pokemon-species/')[1].replace(/[/]/, '') ;
    const [ selected, setSelected ] = useState(false);

    useEffect(() => {
        pokemonsSelected.forEach(pok => {
            if(pok.pokemon_species.name === item.pokemon_species.name){
                setSelected(true);
            }
        })
    }, [])

    const onChange = () => {
        const currentPokemons = [...pokemonsSelected];
        const selectedPokemon = {
            pokemonId,
            ...item
        }

        if(!selected){
            currentPokemons.push(selectedPokemon);
            onChangePokemon(currentPokemons);
        }else{
            const filterPokemons = currentPokemons.filter((pokemon) => pokemon.pokemonId != selectedPokemon.pokemonId);
            onChangePokemon(filterPokemons);
        }
        setSelected(!selected);
    };

  return (
    <Surface
        elevation={5}
        category="large"
        style={styles.container}>
        <Pressable style={styles.pressable} onPress={onChange} >
            <View style={styles.containerInfo}>
                <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`, cache: 'force-cache' }} 
                        style={styles.image}/>
                <Text style={styles.text} >{name}</Text>
            </View>
            <View style={styles.check}>
                <CheckBox value={selected} onValueChange={onChange} />   
            </View>
        </Pressable>
    </Surface>
   
  )
}

export default PokemonItem