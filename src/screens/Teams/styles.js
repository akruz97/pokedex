import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: '4%'
    },
    containerItem: {
        marginVertical: 10,
        borderRadius: 30,
        overflow: 'hidden'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#fff'
    },
    type: {
        textTransform: 'capitalize',
        color: '#fff',
        marginHorizontal: 10
    },
    description: {
        color: '#fff'
    },
    pressable: {

      flexDirection: 'row',
      justifyContent:'space-between',
      borderRadius: 20,
      overflow: 'hidden',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    row: {
        flexDirection: 'row',
    },
    btn: {
       
        paddingHorizontal: 5,
        justifyContent: 'center'
    },
    image: {
        height: 50,
        width: 50
    }
})