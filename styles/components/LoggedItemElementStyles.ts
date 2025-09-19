import { StyleSheet } from 'react-native';
const LoggedItemElementStyles = StyleSheet.create({
    buttonText: {
        fontSize: 12,
    },
    folderSubView: {
        width: '90%',
        display: 'flex',
        alignSelf: 'center',
    },
    folderButton: {
        width: '90%',
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
        height: 100,
        maxHeight: 350,
    },
    buttonTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    buttonSectionLeft: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    buttonSectionRight: {
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    locationDetailsButtonInternal: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: 'red',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flexGrow: 2,
    },
    datesContainer: {
        display: 'flex',
        width: ' 80%',
    },
    warningContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '20%',
    },
});
export default LoggedItemElementStyles;
