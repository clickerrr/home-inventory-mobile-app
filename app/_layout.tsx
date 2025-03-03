import { Stack } from 'expo-router';

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="logged_item_creation"
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name="camera_screens"
                options={{ headerShown: false }}
            ></Stack.Screen>
        </Stack>
    );
};

export default RootLayout;
