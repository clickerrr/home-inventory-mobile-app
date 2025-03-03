import CameraStyles from '@/styles/CameraStyles';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';

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
                    pathname: '/logged_item_creation/product_page',
                    params: { barcodeId: result.data },
                });
            }}
        ></CameraView>
    );
};

export default CameraScanner;
