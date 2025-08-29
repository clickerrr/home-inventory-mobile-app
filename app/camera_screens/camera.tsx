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
import { readFromKeyStore } from '@/utils/KeyStore';
import { getRequest } from '@/utils/RequestHandler';
import { Product } from '@/types/Product';

const Camera = () => {
    const [productBarcode, setProductBarcode] = useState<string>('999999999999');
    const [addingNewProduct, setAddingNewProduct] = useState<boolean>(false);
    const [existingProduct, setExistingProduct] = useState<Product>(null);
    const [checkingProductLoading, setCheckingProductLoading] = useState<boolean>(false);
    const isFocused = useIsFocused();

    const remoteCheckProduct = (upca: string) => {
        setCheckingProductLoading(true);
        getRequest(`products/${upca}`)
            .then((result) => {
                setExistingProduct(result);
                setProductBarcode(result.upca);
                productSampleData[result.upca] = result;
                setCheckingProductLoading(false);
                router.replace({
                    pathname: '/logged_item_creation/product_page',
                    params: {
                        barcodeId: result.upca,
                        title: result.title,
                        description: result.containerType,
                    },
                });
            })
            .catch((error) => {
                setProductBarcode(upca);
                setExistingProduct(null);
                setAddingNewProduct(true);
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
        return (
            <View style={GlobalStyles.container}>
                <LoadingSpinner textToDisplay={'Loading...'} color={null} textSize={null} />
            </View>
        );
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
