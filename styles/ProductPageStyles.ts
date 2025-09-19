import { StyleSheet } from 'react-native';

const ProductPageStyles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    container: {
        marginVertical: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    content: {
        width: '80%',
        height: '70%',
        alignItems: 'center',
    },
    topContainer: {
        height: '10%',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        height: '20%',
    },
    subHeader: {
        marginVertical: 12,
    },
    spinnerButton: {
        borderRadius: 0,
        width: '50%',
    },
    productImage: {
        resizeMode: 'contain',
        width: '50%',
        height: '25%',
    },
    expirationCheckContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    expirationCheckText: {
        marginLeft: '2%',
    },
    expirationInputContainer: {
        height: '30%',
        width: '100%',
    },
    expirationDatePickerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
    },
});

export default ProductPageStyles;
