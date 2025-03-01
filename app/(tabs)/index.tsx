import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity,
	Alert,
	TouchableHighlight,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { router } from 'expo-router';
import GlobalStyles from '@/styles/GlobalStyles';

const Index = () => {
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View>
				<Text>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={GlobalStyles.headerContainer}>
				<Text style={GlobalStyles.headerText}>Scan</Text>
			</View>
			<View style={GlobalStyles.buttonContainerVertical}>
				<TouchableHighlight
					onPress={() => {
						router.navigate({ pathname: '/camera_screens/camera' });
					}}
					style={GlobalStyles.buttonMain}
				>
					<Text>Scan New Item</Text>
				</TouchableHighlight>

				<TouchableHighlight
					onPress={() => {
						router.navigate({ pathname: '/camera_screens/search' });
					}}
					style={GlobalStyles.buttonMain}
				>
					<Text>Search for Item</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
};
export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
	scannerOutline: {
		display: 'flex',
		backgroundColor: 'black',
		width: '80%',
		height: '20%',
	},
});
