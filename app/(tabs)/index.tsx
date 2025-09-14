import { View, Text, TouchableHighlight, Image, Alert, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import barcodeLogo from '@/assets/images/barcode-logo.png';
import { router, useLocalSearchParams } from 'expo-router';
import GlobalStyles from '@/styles/GlobalStyles';
import IndexStyles from '@/styles/IndexStyles';
import { useEffect, useState } from 'react';
import sampleLoggedItems from '@/sampleData/SampleLoggedItems';
import axios from 'axios';
import Config from 'react-native-config';
import { readFromKeyStore } from '@/utils/KeyStore';
import { getRequest } from '@/utils/RequestHandler';
import { toLog } from '@/utils/ConsoleLog';

const Index = () => {
    const [permission, requestPermission] = useCameraPermissions();

    const { flashText, loggedItem } = useLocalSearchParams();

    useEffect(() => {
        if (flashText && loggedItem) {
            Alert.alert('Success', 'Successfully added a new item', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
        console.log('--------[ Sample Logged Items]: ', sampleLoggedItems);
    }, [flashText, loggedItem, sampleLoggedItems]);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={GlobalStyles.container}>
                <TouchableOpacity style={GlobalStyles.buttonMain} onPress={requestPermission}>
                    <Text style={GlobalStyles.largeText}>We need your permission to show the camera</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const testRequestAxios = () => {
        getRequest('products').then((result) => {
            toLog(result, 'testRequestAxios', `(tabs)/index`);
        });
    };
    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <View style={GlobalStyles.headerContent}></View>

                <View style={GlobalStyles.content}>
                    <Image style={IndexStyles.icon} source={barcodeLogo} />
                    <Text style={[GlobalStyles.headerText, IndexStyles.titleText]}>Home Inventory Management</Text>
                </View>
                <View style={GlobalStyles.footerContent}>
                    <TouchableOpacity
                        onPress={() => {
                            testRequestAxios();
                        }}
                    >
                        <Text>Axios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            router.navigate({ pathname: '/camera_screens/camera' });
                        }}
                        style={GlobalStyles.buttonMain}
                    >
                        <Text style={GlobalStyles.buttonText}>Scan New Item</Text>
                    </TouchableOpacity>
                    {/*
                <TouchableOpacity
                    onPress={() => {
                        router.navigate({ pathname: '/camera_screens/search' });
                    }}
                    style={GlobalStyles.buttonMain}
                >
                    <Text style={GlobalStyles.buttonText}>Search for Item</Text>

                </TouchableOpacity>
                */}
                </View>
            </View>
        </View>
    );
};
export default Index;
