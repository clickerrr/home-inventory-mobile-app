import { StyleSheet } from 'react-native';

const NewLocationStyles = StyleSheet.create({
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
export default NewLocationStyles;
