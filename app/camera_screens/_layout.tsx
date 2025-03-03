import { Stack } from 'expo-router';
import { View } from 'react-native';

const CameraLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="camera"
                options={{ title: 'Scan Product UPC Barcode' }}
            ></Stack.Screen>
            <Stack.Screen
                name="search"
                options={{ title: 'Search for Product' }}
            ></Stack.Screen>
        </Stack>
    );
};
export default CameraLayout;
