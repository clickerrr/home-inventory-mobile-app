import CameraScanner from '@/components/CameraScanner';
import productSampleData from '@/sampleData/ProductSampleData';
import CameraStyles from '@/styles/CameraStyles';
import GlobalStyles from '@/styles/GlobalStyles';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { TouchableOpacity, Text, View } from 'react-native';

const Camera = () => {
    const isFocused = useIsFocused();
    return (
        <View style={GlobalStyles.container}>
            {isFocused ? (
                <CameraScanner
                    handleBarcodeScanned={(result) => {
                        console.log(result.data);

                        const productExists = productSampleData[result.data];
                        console.log(productExists);
                        let productBarcode = result.data;
                        if (productExists === undefined) {
                            productBarcode = '999999999999';
                        }
                        router.navigate({
                            pathname: '/logged_item_creation/product_page',
                            params: { barcodeId: productBarcode },
                        });
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
