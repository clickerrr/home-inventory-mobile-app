import { StyleSheet } from 'react-native';

const InventoryStyles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    headerContainer: {
        marginVertical: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
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
        fontWeight: 'bold',
        marginBottom: 12,
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
        textAlign: 'center',
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
    locationDetailsButton: {
        height: 150,
    },
    locationDetailsButtonInternal: {
        display: 'flex',
        justifyContent: 'flex-start',
        //backgroundColor: 'red',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        width: '100%',
    },
    locationDetailsButtonTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    locationDetailsButtonSubtitle: {
        fontWeight: 'bold',
    },
    list: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    productIconContainer: {
        //backgroundColor: 'purple',
        width: '25%',
        height: '100%',
    },
    productIcon: {
        objectFit: 'contain',
        width: '100%',
        height: '100%',
    },
    loggedItemDetailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 12,
    },
    loggedItemDetailsSection: {
        marginBottom: 4,
    },
});
export default InventoryStyles;
