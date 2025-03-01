import CameraScanner from '@/components/CameraScanner';
import CameraStyles from '@/styles/CameraStyles';
import GlobalStyles from '@/styles/GlobalStyles';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { TouchableHighlight, Text, View } from 'react-native';

const Camera = () => {
	return (
		<View style={GlobalStyles.container}>
			<CameraScanner />
			<View style={GlobalStyles.buttonContainerVertical}>
				<TouchableHighlight
					onPress={() => {
						router.back();
					}}
					style={GlobalStyles.buttonMain}
				>
					<Text>Return to Main</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
};
export default Camera;
