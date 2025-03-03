import CameraScanner from '@/components/CameraScanner';
import CameraStyles from '@/styles/CameraStyles';
import GlobalStyles from '@/styles/GlobalStyles';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { TouchableOpacity, Text, View } from 'react-native';

const Camera = () => {
    const isFocused = useIsFocused();
    return (
        <View style={GlobalStyles.container}>
            {isFocused ? <CameraScanner /> : <></>}
            <View style={CameraStyles.container}>
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
