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
        fontSize: 24,
        fontFamily: 'print_bold_tt',
        textTransform: 'capitalize',
        color: '#fff'
    },
    type: {
        textTransform: 'capitalize',
        color: '#fff',
        marginHorizontal: 10,
        fontSize: 18,
        fontFamily: 'print_bold_tt'
    },
    description: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'print_bold_tt',
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
    },
    listEmpty: {
        fontSize: 28,
        fontFamily: 'print_bold_tt'
    },
    floatButton : {
        width: 60,
        height: 60,
        borderRadius: 60/2,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    containerListEmpty: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
})