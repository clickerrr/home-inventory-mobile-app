import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    topPadding: {
        paddingTop: '15%',
    },
    text: {
        color: '#6E6E6E',
        fontSize: 12,
    },
    headerText: {
        fontSize: 32,
        color: '#2E2E2E',
    },
    subHeader: {
        color: '#4E4E4E',
        fontSize: 18,
    },
    largeText: {
        fontSize: 14,
        color: '#6E6E6E',
    },
    buttonMain: {
        backgroundColor: '#272635',
        fontSize: 20,
        padding: '5%',
        width: '80%',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: '5%',
    },
    buttonMainDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    buttonLarge: {},
});

export default GlobalStyles;
