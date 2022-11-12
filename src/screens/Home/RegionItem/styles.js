import { StyleSheet } from "react-native"


export default StyleSheet.create({
    container: {
        marginVertical: 10,
        borderRadius: 30,
        overflow: 'hidden'
    },
    text: {
        fontSize: 24,
        textTransform: 'capitalize',
        color: '#fff',
        fontFamily: 'print_bold_tt'
    },
    pressable: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 20,
      overflow: 'hidden',
      paddingHorizontal: 10
    }
})