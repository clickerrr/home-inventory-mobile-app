import { StyleSheet } from 'react-native';

const NewRoomStyles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    newLocationContainer: {
        height: '15%',
        marginVertical: 4,
    },
    newLocationButtonsContainer: {
        flexDirection: 'row',
    },
    newLocationButton: {
        width: '35%',
        marginVertical: 4,
    },
    content: {
        paddingTop: 12,
        width: '100%',
        height: '80%',
    },
    subHeader: {
        fontWeight: 'bold',
        marginVertical: 12,
    },
    textInputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5,
        marginLeft: 5,
    },
    labelFocused: {
        color: '#007AFF', // iOS blue accent
    },
    input: {
        width: '80%',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android shadow
    },
    inputFocused: {
        borderColor: '#007AFF',
        shadowOpacity: 0.2,
    },
    list: {
        width: '100%',
        maxHeight: '70%',
    },
    listButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 8,
        width: '80%',
        borderRadius: 15,
        // Shadow for iOS
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        // Shadow for Android
        elevation: 5,
        margin: 'auto',
    },
    listButtonDelete: {
        width: '20%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listButton: {
        width: '80%',
        backgroundColor: '#457EAC',
        fontSize: 20,
        padding: '5%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
export default NewRoomStyles;
