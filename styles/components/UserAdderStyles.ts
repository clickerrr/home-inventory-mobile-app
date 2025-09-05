import { StyleSheet } from 'react-native';

const UserAdderStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '2%',
        borderBottomWidth: 1,
    },
    smallButtonText: {
        fontSize: 12,
        color: 'white',
    },
    addUserContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //backgroundColor: 'purple',
        width: '100%',
        height: '85%',
    },
    buttonContainerHorizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    input: {
        marginVertical: 10,
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
    userList: {
        width: '100%',
        //backgroundColor: 'red',
    },
    userListContainer: {
        display: 'flex',
        width: '100%',
        //backgroundColor: 'purple',
    },
    userListItem: {
        margin: 'auto',
        marginVertical: '2%',
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        width: '90%',
        backgroundColor: '#457EAC',

        fontSize: 20,
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        // Shadow for iOS
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        // Shadow for Android
        elevation: 5,
    },
    userListLeftGroup: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '5%',
        maxWidth: '50%',
    },
    userListRightGroup: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        minWidth: '25%',
        maxWidth: '50%',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 1,
    },
    deleteItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: 'red',
        height: '100%',
        width: 50,
    },
});
export default UserAdderStyles;
