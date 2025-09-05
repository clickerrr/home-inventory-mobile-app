import { useAuthentication } from '@/components/AuthContext';
import GlobalStyles from '@/styles/GlobalStyles';
import { toLog } from '@/utils/ConsoleLog';
import { deleteFromKeystore, readFromKeyStore } from '@/utils/KeyStore';
import { router } from 'expo-router';
import { TouchableOpacity, View, Text } from 'react-native';

const DeveloperSettings = () => {
    const { signOut, isAuthenticated } = useAuthentication();
    return (
        <View style={[GlobalStyles.container, { justifyContent: 'space-evenly' }]}>
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
            <TouchableOpacity
                style={GlobalStyles.buttonMain}
                onPress={() => {
                    deleteFromKeystore('himas_refreshToken');
                }}
            >
                <Text style={GlobalStyles.buttonText}>Revoke Token</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={GlobalStyles.buttonMain}
                onPress={() => {
                    //     deleteFromKeystore('himas_refreshToken');
                    //     deleteFromKeystore('himas_authToken');
                    //     router.replace('/login');
                    signOut().then(() => router.replace('/login'));
                }}
            >
                <Text style={GlobalStyles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};
export default DeveloperSettings;
