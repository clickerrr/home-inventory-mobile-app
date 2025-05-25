import ProductAdder from '@/components/ProductAdder';
import GlobalStyles from '@/styles/GlobalStyles';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

let onBarcodeScanned: ((data: string) => void) | null = null;

export function setBarcodeCallback(cb: (data: string) => void) {
    onBarcodeScanned = cb;
}

export function callBarcodeCallback(data: string) {
    if (onBarcodeScanned) {
        onBarcodeScanned(data);
        onBarcodeScanned = null; // clear after use
    }
}

const NewProductScreen = () => {
    const { passedUpca } = useLocalSearchParams();
    const [upca, setUpca] = useState(undefined);
    useEffect(() => {
        console.log('New Product Screen');
    }, []);
    return (
        <View style={GlobalStyles.container}>
            <ProductAdder
                upca={upca}
                onNewUpca={() => {
                    setBarcodeCallback((scannedCode) => {
                        console.log('Scanned:', scannedCode); // Use the scanned value here
                        setUpca(scannedCode);
                    });
                    router.push('/newproduct/upcascanner');
                }}
            />
        </View>
    );
};
export default NewProductScreen;
