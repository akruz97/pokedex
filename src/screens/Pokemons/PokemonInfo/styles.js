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
    }
});