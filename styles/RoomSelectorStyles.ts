import { StyleSheet } from 'react-native';

const RoomSelectorStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
        width: '100%',
    },
    subHeader: { marginVertical: 8 },
    content: {
        height: '70%',
        width: '100%',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '20%',
        width: '100%',
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
export default RoomSelectorStyles;
