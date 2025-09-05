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
    buttonMainHorizontal: {
        width: '35%',
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
    modalScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(100,100,100,0.5)',
    },
    modalView: {
        width: '80%',
        minHeight: '30%',
        maxHeight: '70%',
        flexGrow: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButtonContainer: {
        justifyContent: 'space-around',

        height: '30%',
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
});

export default GlobalStyles;
