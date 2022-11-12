import { View, Text, Modal } from 'react-native'
import React from 'react'
import styles from './styles'
import { ActivityIndicator } from '@react-native-material/core'

const LoadingView = ({ loading, text = 'Espere...' }) => (loading ? (
    <Modal animationType='fade' visible>
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text style={styles.text} >{text}</Text>
        </View>
    </Modal>
  ) : null
)

export default LoadingView