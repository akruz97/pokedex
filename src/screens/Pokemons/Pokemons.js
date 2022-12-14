import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import Header from '../../components/Header';
import { getPokemonsByPokedex, getRegionById, reportCrash } from '../../services';
import PokemonList from './PokemonList/PokemonList';
import { ActivityIndicator, Button, TextInput } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';

const Pokemons = ({ route }) => {

    const region = route.params?.region || null;
    const editMode = route.params?.editMode || false;
    const items = route.params?.items || [];
    const team = route.params?.team || [];
    const [pokemons, setPokemons] = useState([]);
    const [pokemonsFiltered, setPokemonsFiltered] = useState([]);
    const [title, setTitle] = useState("");
    const [pokemonsSelected, setPokemonsSelected] = useState([]); 
    const [loading , setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        if (region){
           setLoading(true);
            const { name, url } = region;
            setTitle(name);
            getRegionById(url).then(res => res.data)
            .then(data => {
                const { pokedexes = [], main_generation } = data;
                if ( pokedexes.length > 0){
                    const urlPokedex = pokedexes[0].url;
                    getPokemons(urlPokedex)
                    
                }
            }).catch((error) => {
                setLoading(false);
                reportCrash(error);
            });
        }
    }, [region]);

    useEffect(() => {
        let pokemonsFiltered = pokemons;

        if(search.length > 0){
           pokemonsFiltered = pokemonsFiltered.filter((item) => 
           String(item.pokemon_species.name).toLowerCase().includes(search.toLowerCase()))
        }

        setPokemonsFiltered(pokemonsFiltered)
    }, [search, pokemons])


    useEffect(() => {
        if(editMode){
            setPokemonsSelected(items);
        }
    }, [editMode]);

    const getPokemons = (urlPokedex) => {
        getPokemonsByPokedex(urlPokedex)
        .then(res => res.data)
        .then(data => {
            const { pokemon_entries } = data;
            setPokemons(pokemon_entries);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            reportCrash(error);
        });
    }

    const onPressCreateTeam = () => {
        if(editMode){
            team.items = pokemonsSelected;
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

    const onChangeSearch = (text) => setSearch(text);

  return (
    <View style={styles.container}>
        <Header title={'Regi??n '+ capitalize(title)} showBack={true} />
        <Text style={styles.textLeft} >Seleccione m??nimo 3 o m??ximo 6 pokemons para crear un equipo</Text>
        <View style={styles.containerInput}>
            <TextInput  value={search} onChangeText={onChangeSearch} 
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholder='Busca aqu?? tu pokemon'
                    style={styles.flex} />
            <Text style={styles.textRight}>{pokemonsSelected.length} seleccionados</Text>
        </View>

        <View style={styles.flex}>
           {
                loading ? (
                    <View style={[styles.flex, styles.justifyCenter]}>
                        <ActivityIndicator size={52} />
                    </View>
                ) : <PokemonList    data={pokemonsFiltered} 
                                    pokemonsSelected={pokemonsSelected} 
                                    onChange={setPokemonsSelected} />
                
           }
        </View>
       <View style={styles.containerButton}>
            <Button title={`${editMode ? 'Terminar selecci??n' : 'Crear equipo'}`} 
                    style={styles.button} 
                    onPress={onPressCreateTeam}
                    disabled={pokemonsSelected.length < 3 || pokemonsSelected.length > 6}/>
       </View>
       
    </View>
  )
}

export default Pokemons