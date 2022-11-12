import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import Header from '../../components/Header';
import { getPokemonsByPokedex, getRegionById } from '../../services';
import PokemonList from './PokemonList/PokemonList';
import { Button } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';

const Pokemons = ({ route }) => {

    const region = route.params?.region || null;
    const editMode = route.params?.editMode || false;
    const items = route.params?.items || [];
    const team = route.params?.team || [];
    console.log('region : ', JSON.stringify(region, null, 4));
    const [pokemons, setPokemons] = useState([]);
    const [title, setTitle] = useState("");
    const [pokemonsSelected, setPokemonsSelected] = useState([]); 
    const navigation = useNavigation();

    useEffect(() => {
        if (region){
            const { name, url } = region;
            setTitle(name);
            getRegionById(url).then(res => res.data)
            .then(data => {
                const { pokedexes = [], main_generation } = data;
                if ( pokedexes.length > 0){
                    const urlPokedex = pokedexes[0].url;
                    getPokemons(urlPokedex)
                }
            })
        }
    }, [region]);


    useEffect(() => {
        if(editMode){
            console.log('items :', items.length);
            console.log('edit Mode');
            setPokemonsSelected(items);
        }
    }, [editMode]);

    const getPokemons = (urlPokedex) => {
        getPokemonsByPokedex(urlPokedex)
        .then(res => res.data)
        .then(data => {
            const { pokemon_entries } = data;
            setPokemons(pokemon_entries);
        }).catch(error => {
            console.log(error.message);
        });
    }

    const onPressCreateTeam = () => {
        if(editMode){
            console.log('items: ', pokemonsSelected.length);
            team.items = pokemonsSelected
            navigation.navigate('FormTeam', {
                    editMode,
                    items: pokemonsSelected,
                    team: team
            });

        } else {
            navigation.navigate('FormTeam', {
                items: pokemonsSelected,
                region: region
            });
        }
       
    }

    const capitalize = (string) => {
        return string.length ? string[0].toUpperCase() + string.slice(1) : "";
    }

  return (
    <View style={styles.container}>
        <Header title={'Región '+ capitalize(title)} showBack={true} />

        <Text style={styles.textLeft} >Seleccione mínimo 3 o máximo 6 pokemons para crear un equipo</Text>
       <Text style={styles.textRight}>{pokemonsSelected.length} seleccionados</Text>

        <View style={{ flex: 1 }}>
            <PokemonList data={pokemons} 
            pokemonsSelected={pokemonsSelected} 
            onChange={setPokemonsSelected} />
        </View>
       <View style={{ height: 60 }}>
            <Button title={`${editMode ? 'Terminar selección' : 'Crear equipo'}`} 
                    style={styles.button} 
                    onPress={onPressCreateTeam}
                    disabled={pokemonsSelected.length < 3 || pokemonsSelected.length > 6}/>
       </View>
       
    </View>
  )
}

export default Pokemons