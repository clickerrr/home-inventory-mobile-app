import { useAuthentication } from '@/components/AuthContext';
import { Stack } from 'expo-router';

const InventoryLayout = () => {
    const { isAuthenticated } = useAuthentication();
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="productsview/[productupca]" options={{ title: 'Product Details' }}></Stack.Screen>
            <Stack.Screen name="locationsview/[locationid]" options={{ title: 'Location Details' }}></Stack.Screen>
            <Stack.Screen name="[roomid]" options={{ title: 'Room Details' }}></Stack.Screen>
            <Stack.Screen name="productlist" options={{ title: 'Product List' }}></Stack.Screen>
        </Stack>
    );
};
export default InventoryLayout;
