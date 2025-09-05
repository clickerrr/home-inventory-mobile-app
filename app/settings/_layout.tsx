import { Stack } from 'expo-router';

const SettingsLayout = () => {
    return (
        <Stack>
            {/* Expo router on android will render the first index as the entry point */}
            <Stack.Screen name="developer" options={{ title: 'Developer Settings', headerShown: true }}></Stack.Screen>
            <Stack.Screen name="user" options={{ title: 'User Settings', headerShown: true }}></Stack.Screen>
        </Stack>
    );
};

export default SettingsLayout;
