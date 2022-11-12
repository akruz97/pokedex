import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: '4%'
    },
    containerForm: {
        flex: 1,
    },
    button: {
        height: 50, 
        justifyContent: 'center'
    },
    inputContainerStyle: {
        backgroundColor: '#fff'
    },
    dropdown: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginVertical: 5
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 20,
        textTransform: 'capitalize',
        fontFamily: 'print_bold_tt'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      itemTextStyle: {
        fontSize: 22,
        textTransform: 'capitalize',
        fontFamily: 'print_bold_tt'
      },
      inputStyle : {
        fontSize: 22,
        fontFamily: 'print_bold_tt'
      }
})