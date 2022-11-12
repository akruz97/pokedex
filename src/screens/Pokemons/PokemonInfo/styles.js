import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: '47%',
        height: 140,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 40,
        overflow: 'hidden'
    },
    image: {
       flex: 1,
       resizeMode: 'contain'
    },
    height: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    weight: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
        textTransform: 'capitalize',
        color: '#000'
    },
    badge: {
        color: '#000',
        fontSize: 12  
    },
    delete: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    containerImage: {
        width: '50%',
        height: '100%'
    },
    containerInfo: {
        height: '70%',
        flexDirection: 'row'
    },
    mv8: {
        marginVertical: 8
    }
});