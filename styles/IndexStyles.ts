import { StyleSheet } from 'react-native';
const IndexStyles = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
        width: '50%',
        height: '25%',
    },
    header: {
        height: '10%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    content: {
        height: '60%',
        paddingTop: 32,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    footerContent: {
        width: '100%',
        height: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        padding: '2%',
        textAlign: 'center',
    },
});
export default IndexStyles;
