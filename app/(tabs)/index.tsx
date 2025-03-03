import { View, Text, TouchableHighlight, Image, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import barcodeLogo from '@/assets/images/barcode-logo.png';
import { router, useLocalSearchParams } from 'expo-router';
import GlobalStyles from '@/styles/GlobalStyles';
import IndexStyles from '@/styles/IndexStyles';
import { useEffect } from 'react';

const Index = () => {
    const [permission, requestPermission] = useCameraPermissions();

    const { flashText, loggedItem } = useLocalSearchParams();
    useEffect(() => {
        if (flashText && loggedItem) {
            Alert.alert('Success', 'Successfully added a new item', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
    }, [flashText, loggedItem]);
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={GlobalStyles.container}>
                <Text style={GlobalStyles.largeText}>
                    We need your permission to show the camera
                </Text>
                <TouchableHighlight
                    style={GlobalStyles.buttonMain}
                    onPress={requestPermission}
                >
                    <Text style={GlobalStyles.buttonText}></Text>
                </TouchableHighlight>
            </View>
        );
    }

    return (
        <View style={GlobalStyles.container}>
            <Image style={IndexStyles.icon} source={barcodeLogo} />
            <TouchableHighlight
                onPress={() => {
                    router.navigate({ pathname: '/camera_screens/camera' });
                }}
                style={GlobalStyles.buttonMain}
            >
                <Text style={GlobalStyles.buttonText}>Scan New Item</Text>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => {
                    router.navigate({ pathname: '/camera_screens/search' });
                }}
                style={GlobalStyles.buttonMain}
            >
                <Text style={GlobalStyles.buttonText}>Search for Item</Text>
            </TouchableHighlight>
        </View>
    );
};
export default Index;
