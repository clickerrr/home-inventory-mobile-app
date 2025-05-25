import { StyleSheet } from 'react-native';

const HomeLayoutStyles = StyleSheet.create({
    subHeader: {
        marginVertical: 12,
    },
    content: {
        alignItems: 'center',
        width: '100%',
        height: '70%',
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
    list: {
        width: '100%',
        maxHeight: '85%',
    },
    button: {
        width: '80%',
        backgroundColor: '#457EAC',
        fontSize: 20,
        padding: '5%',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 8,
        // Shadow for iOS
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        // Shadow for Android
        elevation: 5,
        margin: 'auto',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        width: '100%',
    },
});
export default HomeLayoutStyles;
