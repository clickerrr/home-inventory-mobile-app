import { View, Text } from 'react-native';
import { useLocalSearchParams, usePathname } from 'expo-router';

const Inventory = () => {
    const { barcodeId, other } = useLocalSearchParams();

    return (
        <View>
            <Text>Inventory</Text>
            <Text>{barcodeId}</Text>
        </View>
    );
};
export default Inventory;
