import CameraScanner from '@/components/CameraScanner';
import productSampleData from '@/sampleData/ProductSampleData';
import CameraStyles from '@/styles/CameraStyles';
import GlobalStyles from '@/styles/GlobalStyles';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { TouchableOpacity, Text, View } from 'react-native';
import ProductAdder from '@/components/ProductAdder';
import { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';

const Camera = () => {
    const [productBarcode, setProductBarcode] = useState<string>('999999999999');
    const [addingNewProduct, setAddingNewProduct] = useState<boolean>(false);
    const [existingProduct, setExistingProduct] = useState<Product>(null);
    const [checkingProductLoading, setCheckingProductLoading] = useState<boolean>(false);
    const isFocused = useIsFocused();

    const remoteCheckProduct = (upca: string) => {
        console.log('checking...');
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        setCheckingProductLoading(true);
        const result = axios
            .get(`${baseUrl}/products/${upca}`)
            .then((response) => {
                console.log('axios result', response.data);
                setExistingProduct(response.data);
                setCheckingProductLoading(false);
                setProductBarcode(response.data.upca);
                productSampleData[response.data.upca] = response.data;
                router.navigate({
                    pathname: '/logged_item_creation/product_page',
                    params: {
                        barcodeId: response.data.upca,
                        title: response.data.title,
                        description: response.data.containerType,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 404) {
                        setProductBarcode(upca);
                        setAddingNewProduct(true);
                        setExistingProduct(null);
                    }
                }
                setCheckingProductLoading(false);
            });
    };

    if (addingNewProduct) {
        return (
            <ProductAdder
                upca={productBarcode}
                onSubmit={(product: Product) => {
                    setProductBarcode(product.upca);
                    setAddingNewProduct(false);
                    router.back();
                    router.navigate({
                        pathname: '/logged_item_creation/product_page',
                        params: { barcodeId: productBarcode },
                    });
                }}
            />
        );
    }

    if (checkingProductLoading) {
        return <LoadingSpinner textToDisplay={'Loading...'} color={null} />;
    }

    return (
        <View style={GlobalStyles.container}>
            {isFocused ? (
                <CameraScanner
                    handleBarcodeScanned={(result) => {
                        console.log('barcode scanned', result.data);
                        remoteCheckProduct(result.data);
                        return;
                    }}
                />
            ) : (
                <View style={CameraStyles.camera}></View>
            )}
            <View style={GlobalStyles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        router.back();
                    }}
                    style={GlobalStyles.buttonMain}
                >
                    <Text style={GlobalStyles.buttonText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Camera;
