import { StyleSheet } from 'react-native';

const ProductAdderStyles = StyleSheet.create({
    content: {
        paddingTop: 12,
        width: '100%',
        height: '80%',
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginVertical: 12,
    },
    subHeader: {
        marginVertical: 12,
    },
    label: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5,
        marginLeft: 5,
    },
    labelFocused: {
        color: '#007AFF', // iOS blue accent
    },
    dropdown: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textInputContainer: {
        width: '100%',
        alignItems: 'center',
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
});

export default ProductAdderStyles;
