import { StyleSheet } from "react-native"


export default StyleSheet.create({
    container: {
        marginVertical: 10,
        borderRadius: 30,
        overflow: 'hidden'
    },
    text: {
        fontSize: 28,
        fontFamily: 'print_bold_tt',
        textTransform: 'capitalize',
        marginHorizontal: 10
    },
    pressable: {
      height: 60,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 20,
      overflow: 'hidden',
      paddingHorizontal: 10,
      flexDirection: 'row'
    },
    image: {
        height: 70,
        width: 60
    },
    containerInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    check: {
        marginRight: 15
    }
})