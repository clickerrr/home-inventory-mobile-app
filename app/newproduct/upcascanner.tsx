import CameraScanner from '@/components/CameraScanner';
import { router } from 'expo-router';
import { TouchableOpacity, View, Text } from 'react-native';
import { callBarcodeCallback } from './newproductscreen';

const UpcaScanner = () => {
    const handleReturn = () => {
        router.back();
    };
    return (
        <View>
            <CameraScanner
                handleBarcodeScanned={(result) => {
                    callBarcodeCallback(result.data);
                    handleReturn();
                }}
            />
        </View>
    );
};
export default UpcaScanner;
