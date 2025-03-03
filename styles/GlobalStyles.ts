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
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '20%',
        width: '100%',
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
    },
    buttonMainDisabled: {
        opacity: 0.5,
    },
    buttonSecondary: {
        backgroundColor: '#272635',
        fontSize: 20,
        padding: '5%',
        width: '80%',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonCancel: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#272635',
        fontSize: 20,
        padding: '5%',
        width: '80%',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    buttonCancelText: {
        color: 'black',
        fontSize: 18,
    },
    buttonLarge: {},
});

export default GlobalStyles;
