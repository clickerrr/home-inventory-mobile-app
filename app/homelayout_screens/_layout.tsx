import { Stack } from 'expo-router';

const HomeLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="newlocation"
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name="newroom"
                options={{ headerShown: false }}
            ></Stack.Screen>
        </Stack>
    );
};
export default HomeLayout;
