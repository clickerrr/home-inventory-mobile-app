import { StyleSheet } from 'react-native';
const NewHouseStyles = StyleSheet.create({
    headerContent: {
        //backgroundColor: 'red',
        height: '10%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    content: {
        width: '100%',
        height: '70%',
        //backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userAdderContainer: {
        //backgroundColor: 'green',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '80%',
    },
    input: {
        width: '80%',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 12,
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

    errorMessage: { color: 'red' },
    footerContent: {
        width: '100%',
        minHeight: '10%',
        maxHeight: '20%',
        //backgroundColor: 'purple',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
export default NewHouseStyles;
