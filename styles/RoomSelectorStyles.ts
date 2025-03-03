import { StyleSheet } from 'react-native';

const RoomSelectorStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
    },
    subHeader: { marginVertical: 8 },
    dropdown: {
        height: 50,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});
export default RoomSelectorStyles;
