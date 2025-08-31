import { useAuthentication } from '@/components/AuthContext';
import { Stack } from 'expo-router';

const HomeLayout = () => {
    const { isAuthenticated } = useAuthentication();
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="newlocation" options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="newroom" options={{ headerShown: false }}></Stack.Screen>
            </Stack.Protected>
        </Stack>
    );
};
export default HomeLayout;
