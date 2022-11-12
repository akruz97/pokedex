import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { getRegions } from '../../../services';
import RegionItem from '../RegionItem/RegionItem';

export default function RegionList() {

    const [regions, setRegions] = useState([]);

    useEffect(() => {
        getRegions().then(res => res.data)
        .then(data => {
            const {results } = data;
            setRegions(results);
        })
    }, []);

    const renderItem = ({ item }) => (
       <RegionItem item={item} />
    )


  return (
    <View style={styles.container}>
        <FlatList 
            data={regions}
            keyExtractor={(item) => item.name}
            renderItem={renderItem}
        />
    </View>
  )
}