import { Stack } from 'expo-router';

const HouseManageLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="users" options={{ headerShown: false }}></Stack.Screen>
        </Stack>
    );
};
export default HouseManageLayout;
