import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: '4%'
    },
    flex: {
        flex: 1
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    textLeft: {
        textAlign: 'left',
        fontSize: 20,
        fontFamily: 'print_bold_tt'
    },
    textRight: {
        textAlign: 'right',
        fontSize: 20,
        fontFamily: 'print_bold_tt'
    },
    button: {
        height: 50, 
        justifyContent: 'center'
    },
    containerButton : {
        height: 60
    },
    inputContainerStyle: {
        backgroundColor: '#fff'
    },
    inputStyle: {
        paddingBottom: 0
    },
    containerInput : {
        flexDirection: 'row',
        alignItems: 'center'
    }
})