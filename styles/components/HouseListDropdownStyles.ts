import { StyleSheet } from 'react-native';
const HouseListDropdownStyles = StyleSheet.create({
    dropdown: {
        width: '80%',
        backgroundColor: 'transparent',
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
    headerText: { fontWeight: 'bold' },
    subheaderText: {
        fontSize: 32,
    },
    text: {
        fontSize: 16,
    },
    placeholderText: {},
});
export default HouseListDropdownStyles;
