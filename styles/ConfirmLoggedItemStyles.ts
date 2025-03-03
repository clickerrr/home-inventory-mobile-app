import { StyleSheet } from 'react-native';

const ConfirmLoggedItemStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 12,
    },
    contentContainer: {
        height: '70%',
    },
    buttonContainer: {
        width: '100%',
        height: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    subHeader: {
        fontWeight: 'bold',
    },
    largeText: {
        marginTop: 12,
    },
});
export default ConfirmLoggedItemStyles;
