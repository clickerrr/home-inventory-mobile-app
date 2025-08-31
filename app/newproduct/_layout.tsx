import { useAuthentication } from '@/components/AuthContext';
import { Stack } from 'expo-router';

const NewProductLayout = () => {
    const { isAuthenticated } = useAuthentication();
    return (
        <Stack>
            <Stack.Screen name="newproductscreen" options={{ title: 'New Product', headerShown: true }} />
            <Stack.Screen
                name="upcascanner"
                options={{
                    title: 'Scan New Product Barcode',
                    headerShown: true,
                }}
            />
        </Stack>
    );
};

export default NewProductLayout;
