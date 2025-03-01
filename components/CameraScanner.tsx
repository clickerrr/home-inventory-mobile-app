import CameraStyles from '@/styles/CameraStyles';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';

const CameraScanner = () => {
    return (
        <CameraView
            style={CameraStyles.camera}
            facing={'back'}
            barcodeScannerSettings={{
                barcodeTypes: ['upc_a'],
            }}
            autofocus={'off'}
            onBarcodeScanned={(result) => {
                console.log(result.data);
                router.navigate({
                    pathname: '/inventory',
                    params: { barcodeId: result.data },
                });
            }}
        ></CameraView>
    );
};

export default CameraScanner;
