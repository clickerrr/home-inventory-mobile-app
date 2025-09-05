import { StyleSheet } from 'react-native';
const NewHouseStyles = StyleSheet.create({
    headerContent: {
        backgroundColor: 'red',
        height: '30%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    icon: {
        resizeMode: 'contain',
        width: '100%',
        height: '50%',
    },
    content: {
        width: '100%',
        height: '30%',
        backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: '5%',
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android shadow
    },
    inputFocused: {
        borderColor: '#007AFF',
        shadowOpacity: 0.2,
    },

    showPasswordIcon: {
        backgroundColor: 'red',
        position: 'static',
    },
    errorMessage: { color: 'red' },
    forgotPassword: {
        fontSize: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerContent: {
        width: '100%',
        height: '30%',
        backgroundColor: 'purple',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    copyrightText: {
        marginVertical: '1%',
    },
});
export default NewHouseStyles;
