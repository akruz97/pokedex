import { View, Text, FlatList, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Header from '../../components/Header'
import { Button, TextInput } from '@react-native-material/core'
import PokemonInfo from '../Pokemons/PokemonInfo'
import { Overlay } from '@rneui/base'
import { setData, pushData, getTypes } from '../../services'
import auth from '@react-native-firebase/auth'
import LoadingView from '../../components/LoadingView'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { Dropdown } from 'react-native-element-dropdown';




const FormTeam = ({ route }) => {   

    const [types, setTypes] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [region, setRegion] = useState(route.params?.region || {})

    const items = route.params?.items ?? [];
    const team = route.params?.team || {};
    const editMode = route.params?.editMode ?? false;
    const [pokemons, setPokemons] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [description, setDescription] = useState("");
    const [number, setNumber] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {

        if(editMode && route.params?.team){
            console.log('ejecut ...');
            const { teamName, description, number = "", type, items: itemsPokemon, region } = team || {};
            setTeamName(teamName);
            setDescription(description);
            setNumber(String(number));
            setValue(type)
            console.log('size : ', itemsPokemon.length);
            setPokemons(itemsPokemon); 
            setRegion(region);
            getTypesPokemon();
        } else {
            setPokemons(items);            
            getTypesPokemon();
        }
    }, [editMode, route.params?.items]);


    const getTypesPokemon = async () => {
        getTypes()
        .then(res => res.data)
        .then(data => {
            const { results = [] } = data;
            let typesMapped = results.map(item => ({ label: item.name, value: item.name }))
            setTypes(typesMapped);
        })
    }

    const onPressSave = async () => {

        if(!validateFields()){
            Alert.alert('Datos incompletos', 'Por favor llene todos los campos')
            return;
        }
            
        const uid = auth().currentUser.uid;
        const ref = editMode ? `teams/${uid}/${team.id}` : `teams/${uid}`;

        const data = {
            teamName,
            number: parseInt(number),
            type: value,
            description,
            region,
            pokemons
        }

        setLoading(true);

        const serviceData = editMode ? setData : pushData

        const result = await serviceData(ref, data);
        if(result == "OK" ){
            setTimeout(() => {
                setLoading(false);
                Toast.show({
                    type: 'success',
                    text1: `Equipo ${editMode ? 'actualizado' : 'creado'} correctamente!`
                })
                navigation.navigate('Teams');
            }, 1000);
        }else{
            setLoading(false);
            Alert.alert("Error", "No se pudo guardar la información", [
                {
                    text: 'Intentar de nuevo',
                    onPress: () => onPressSave()
                }
            ])
        }
    }

    const deletePokemon = (pokemonId) => {
        const filterPokemons = pokemons.filter(item => item.pokemonId != pokemonId );
        setPokemons(filterPokemons);
    }

    const addPokemons = () => {
        navigation.push('Pokemons', {
            editMode: true,
            region,
            items: pokemons,
            team: team
        });
    }

    const renderItem = ({ item }) => {

        return <PokemonInfo pokemon={item} deletePokemon={deletePokemon} />
    }

    const validateFields = () => {
        if(!teamName.length || !number.length || !description.length || value == null){
            return false;
        }
        return true;
    }

    const onChangeTeamName = (text) => setTeamName(text);
    const onChangeNumber = (text) => setNumber(text);
    const onChangeType = (text) => setType(text);
    const onChangeDescription = (text) => setDescription(text); 

    const renderLabel = () => {
          return (
            <Text style={[isFocus && { color: 'blue' }]}>
              Tipo
            </Text>
          );
      };
    
  return (
    <View style={styles.container}>
        <LoadingView loading={loading} />
        <Header title={`${editMode ? 'Actualizar' : 'Completar' } información de equipo`} showBack={true} />
        <View style={styles.containerForm}>
            <TextInput value={teamName} 
                        onChangeText={onChangeTeamName} 
                        placeholder='Nombre del equipo' 
                        
                        inputContainerStyle={styles.inputContainerStyle} />
            <View style={{
                flexDirection: 'row',
                marginTop: 10
            }}>
                <TextInput value={number} 
                            onChangeText={onChangeNumber}
                            keyboardType='number-pad'
                            placeholder='Número' 
                            inputContainerStyle={styles.inputContainerStyle} 
                            style={{ flex: 1 }} />
                <View style={{ flex: 1 }}>
                {renderLabel()}
                <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={types}
                        itemTextStyle={styles.itemTextStyle}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Seleccione tipo' : '...'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        />
                        </View>
            </View>
            <TextInput value={description} onChangeText={onChangeDescription} placeholder='Descripción' inputContainerStyle={styles.inputContainerStyle} />
            
            {
                pokemons.length < 6 && editMode ? (
                    <Button variant="outlined" 
                            title="Agregar pokemon" 
                            onPress={() => addPokemons()}
                            style={{
                                marginTop: 10
                            }}
                            />
                ) : null
            }

            <FlatList 
                data={pokemons}
                keyExtractor={(item) => item.pokemonId}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                style={{
                    marginVertical: 20
                }}
            />
        </View>
        <View style={{ height: 60 }}>
            <Button title={`${editMode ? 'Actualizar' : 'Guardar'}` } 
                    style={styles.button} 
                    onPress={onPressSave}
                    disabled={pokemons.length < 3 || pokemons.length > 6}
                    />
       </View>

      

     
    </View>
  )
}

export default FormTeam