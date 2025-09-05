import { Stack } from 'expo-router';

const RootLayout = () => {
    return (
        <Stack>
            {/* Expo router on android will render the first index as the entry point */}
            <Stack.Screen name="index" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="login" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="register" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="forgotpassword" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="(tabs)" options={{ title: 'Home', headerShown: false }} />
            <Stack.Screen name="camera_screens" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="inventory_screens" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="logged_item_creation" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen
                name="homelayout_screens"
                options={{ title: 'Home Layout', headerShown: true }}
            ></Stack.Screen>
            <Stack.Screen name="newproduct" options={{ title: 'New Product', headerShown: false }}></Stack.Screen>
            <Stack.Screen name="settings" options={{ title: 'Settings', headerShown: true }}></Stack.Screen>
        </Stack>
    );
};

export default RootLayout;
