import GlobalStyles from '@/styles/GlobalStyles';
import { Image, Text, View } from 'react-native';
import LoadingSpinner from './LoadingSpinner';
import barcodeLogo from '@/assets/images/barcode-logo.png';
import React from 'react';

const LoadingScreen = () => {
    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <Image style={GlobalStyles.iconSmall} source={barcodeLogo} />
                <Text style={GlobalStyles.subHeader}>HIMaS</Text>
                <LoadingSpinner textToDisplay={'Loading... '} color={'black'} textSize={16} />
            </View>
        </View>
    );
};
export default LoadingScreen;
