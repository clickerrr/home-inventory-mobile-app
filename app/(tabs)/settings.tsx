import GlobalStyles from '@/styles/GlobalStyles';
import { toLog } from '@/utils/ConsoleLog';
import { readFromKeyStore } from '@/utils/KeyStore';
import { View, Text, TouchableOpacity } from 'react-native';

const Settings = () => {
    const devEnvironment = process.env.EXPO_PUBLIC_IS_DEV;
    if (devEnvironment) {
        return (
            <View style={GlobalStyles.container}>
                <TouchableOpacity
                    style={GlobalStyles.buttonMain}
                    onPress={() => {
                        toLog(readFromKeyStore('himas_authToken'), 'printAuthToken', '(tabs)/settings');
                    }}
                >
                    <Text style={GlobalStyles.buttonText}>Print Auth Token</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.buttonMain}
                    onPress={() => {
                        toLog(readFromKeyStore('himas_refreshToken'), 'printAuthToken', '(tabs)/settings');
                    }}
                >
                    <Text style={GlobalStyles.buttonText}>Print Refresh Token</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.largeText}>No Settings Yet</Text>
        </View>
    );
};
export default Settings;
