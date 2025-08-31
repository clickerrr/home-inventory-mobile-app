import { useAuthentication } from '@/components/AuthContext';
import { Stack } from 'expo-router';
import { View } from 'react-native';

const CameraLayout = () => {
    const { isAuthenticated } = useAuthentication();
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="camera" options={{ title: 'Scan Product UPC Barcode' }}></Stack.Screen>
                <Stack.Screen name="search" options={{ title: 'Search for Product' }}></Stack.Screen>
            </Stack.Protected>
        </Stack>
    );
};
export default CameraLayout;
