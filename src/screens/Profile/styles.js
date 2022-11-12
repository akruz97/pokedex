import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '4%'
    },
    photo: {
        height: 120,
        width: 120,
        borderRadius: 120/2,
        alignSelf: 'center',
        marginVertical: 20
    },
    text: {
        fontSize: 26,
        fontFamily: 'print_bold_tt',
        marginVertical: 5
    },
    btn: {
        marginVertical: 20,
        height: 50,
        justifyContent: 'center'
    }
})