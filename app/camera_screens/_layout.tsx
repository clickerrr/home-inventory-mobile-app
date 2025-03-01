import { Stack } from 'expo-router';
import { View } from 'react-native';

const CameraLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="camera"></Stack.Screen>
			<Stack.Screen name="search"></Stack.Screen>
		</Stack>
	);
};
export default CameraLayout;
