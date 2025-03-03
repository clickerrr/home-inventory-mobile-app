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
        width: '100%',
    },
    subHeader: {
        marginVertical: 12,
    },
    spinnerButton: {
        borderRadius: 0,
        width: '50%',
    },
});

export default ProductPageStyles;
