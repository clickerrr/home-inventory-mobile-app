import CameraStyles from '@/styles/CameraStyles';
import { CameraView } from 'expo-camera';

interface CameraScannerProps {
    handleBarcodeScanned: (result) => void;
}

const CameraScanner = ({ handleBarcodeScanned }: CameraScannerProps) => {
    return (
        <CameraView
            style={CameraStyles.camera}
            facing={'back'}
            barcodeScannerSettings={{
                barcodeTypes: ['upc_a', 'upc_e'],
            }}
            autofocus={'off'}
            onBarcodeScanned={handleBarcodeScanned}
            onMountError={(error) => {
                console.error(error);
            }}
        ></CameraView>
    );
};

export default CameraScanner;
