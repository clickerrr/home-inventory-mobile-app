import { Stack } from 'expo-router';

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{ title: 'Home', headerShown: false }}
            />
            <Stack.Screen
                name="logged_item_creation"
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name="homelayout_screens"
                options={{ title: 'Home Layout', headerShown: true }}
            ></Stack.Screen>
            <Stack.Screen
                name="camera_screens"
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name="inventory_screens"
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name="newproduct"
                options={{ title: 'New Product', headerShown: false }}
            ></Stack.Screen>
        </Stack>
    );
};

export default RootLayout;
