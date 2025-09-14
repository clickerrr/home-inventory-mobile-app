import { useAuthentication } from '@/components/AuthContext';
import GlobalStyles from '@/styles/GlobalStyles';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const UserSettings = () => {
    const { signOut, isAuthenticated } = useAuthentication();
    return (
        <View style={[GlobalStyles.container]}>
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
export default UserSettings;
