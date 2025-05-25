import { StyleSheet } from 'react-native';

const InventoryProductStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',

        flexDirection: 'column',
        alignItems: 'center',
    },
    content: {
        height: '80%',
        paddingTop: 32,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    subHeader: {
        marginVertical: 8,
    },
    list: {
        width: '100%',
        maxHeight: '85%',
    },
    listButton: {
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
});
export default InventoryProductStyles;
