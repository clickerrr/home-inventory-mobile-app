import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
	text: {
		color: 'white',
	},
	headerContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		height: '30%',
	},
	headerText: {
		fontSize: 22,
	},
	buttonContainerHorizontal: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		backgroundColor: 'blue',
	},
	buttonContainerVertical: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	buttonMain: {
		backgroundColor: 'orange',
		fontSize: 20,
		padding: '5%',
		width: '80%',
		borderRadius: '10%',
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'row',
		// justifyContent: 'center',
		// alignItems: 'center',
		marginVertical: '5%',
	},
	buttonLarge: {},
});

export default GlobalStyles;
