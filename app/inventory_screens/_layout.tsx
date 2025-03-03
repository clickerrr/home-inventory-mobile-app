import { Stack } from 'expo-router';

const InventoryLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="product"
                options={{ title: 'Product List' }}
            ></Stack.Screen>
        </Stack>
    );
};
export default InventoryLayout;
