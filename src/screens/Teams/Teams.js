import { View, Text, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { FlatList } from 'react-native-gesture-handler'
import { Button, Surface, Pressable } from '@react-native-material/core'
import { getCollection } from '../../services'
import auth from '@react-native-firebase/auth'
import Header from '../../components/Header'
import database from '@react-native-firebase/database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import pokemonColors from '../../util/pokemonColors'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

const Teams = () => {

  const [teams, setTeams] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getTeams();

  }, []);

  const getTeams = async () => {
    const uid = auth().currentUser.uid;
    const ref = 'teams/'+uid;
    
    database()
    .ref(ref)
    .on('value', snapshot => {
      const result = [];
        snapshot.forEach(element => {
            const id = element.key;
            const val = element.val();
            let obj = { id: id, ...val }
            console.log('obj', JSON.stringify(obj, null, 4));
            result.push(obj);
        });
        setTeams(result);
    });

  }

  const onPressEdit = (item) => {
    navigation.navigate('FormTeam', 
    { 
      editMode: true, 
      team: {
        ...item,
        items: item.pokemons
      }
    });
  };

  const onPressDelete = (id) => {
    Alert.alert("Eliminar equipo", "Estás seguro de eliminar este equipo?", [
      { 
        text: 'Si',
        onPress: () => {
          deleteTeam(id)
        }
      },
      {
        text: 'Cancelar',
        onPress: () => {}
      }
    ])

  }

  const deleteTeam = (id) => {
    const uid = auth().currentUser.uid;
    const ref = `teams/${uid}/${id}`
    database()
    .ref(ref)
    .set(null)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Equipo eliminado correctamente!'
      });
    })
  }

  const renderItem = ({ item }) => (
    <Surface
        elevation={0}
        category="large"
        style={[styles.containerItem, { backgroundColor: item.type ? pokemonColors[item.type] : pokemonColors['unknow'] }]}>
        <Pressable>
        <View style={styles.pressable} onPress={() => {}} >
          <View style={{
            flex: 1
          }}>
            <View style={[styles.row, { alignItems: 'center' }]}>
              <Text style={styles.text} numberOfLines={1} >Equipo: {item.teamName}</Text>
              
            </View>
            <View style={{ flex: 1  }}>
            <View style={styles.row}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.type}>({item.type})</Text>
            </View>
           
            </View>
            

          </View>
          <View style={[styles.row, { width: '20%', alignItems: 'flex-start' }]}>
            <Pressable style={styles.btn} onPress={() => onPressEdit(item)} >
              <MaterialCommunityIcons name='square-edit-outline' size={28} color='#fff' />
            </Pressable>
            <Pressable style={styles.btn} onPress={() => onPressDelete(item.id)} >
              <MaterialCommunityIcons name='delete' size={28} color='#fff' />
            </Pressable>
          </View>
            
        </View>
        <View style={[styles.row, { marginVertical: 5, marginHorizontal: 5 }]}>
            { 
              item.pokemons.length > 0 ? (
                <>
                  {
                    item.pokemons.map(pokemon => {
                      return (
                        <Image key={pokemon.pokemonId} 
                              source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemon.pokemonId +'.png', cache: 'force-cache' }} 
                              style={styles.image}/>
                      )
                    })
                  }
                  </>
             
              ) : null
            }
            </View>
        </Pressable>
    </Surface>
  )

  return (
    <View style={styles.container}>
      <Header title={'Equipos'} />
      <FlatList 
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      
      />
    </View>
  )
}

export default Teams