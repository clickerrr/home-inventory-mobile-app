import { Stack } from 'expo-router';
import { View } from 'react-native';

const LoggedItemCreationLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="product_page"></Stack.Screen>
		</Stack>
	);
};
export default LoggedItemCreationLayout;
