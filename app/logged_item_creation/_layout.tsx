import { useAuthentication } from '@/components/AuthContext';
import { Stack } from 'expo-router';

const LoggedItemCreationLayout = () => {
    const { isAuthenticated } = useAuthentication();
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="product_page" options={{ title: 'Verify Product Information' }}></Stack.Screen>
            <Stack.Screen name="room_page" options={{ title: 'Select Room and Location' }}></Stack.Screen>
            <Stack.Screen name="confirm_logged_item" options={{ title: 'Confirm New Item' }}></Stack.Screen>
        </Stack>
    );
};
export default LoggedItemCreationLayout;
