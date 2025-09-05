import { useAuthentication } from '@/components/AuthContext';
import GlobalStyles from '@/styles/GlobalStyles';
import SettingsStyles from '@/styles/views/SettingsStyles';
import { toLog } from '@/utils/ConsoleLog';
import { deleteFromKeystore, readFromKeyStore } from '@/utils/KeyStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const Settings = () => {
    const linkList = [
        { title: 'Developer Settings', link: '/settings/developer' },
        { title: 'User Settings', link: '/settings/user' },
    ];
    const devEnvironment = process.env.EXPO_PUBLIC_IS_DEV;
    const { signOut, isAuthenticated } = useAuthentication();
    const renderItems = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    router.navigate(item.link);
                }}
                style={SettingsStyles.listItem}
            >
                <Text style={GlobalStyles.subHeader}>{item.title}</Text>
                <MaterialIcons name="chevron-right" size={20} />
            </TouchableOpacity>
        );
    };
    if (devEnvironment) {
        return (
            <View style={[GlobalStyles.container, { justifyContent: 'space-evenly' }]}>
                <FlatList data={linkList} renderItem={renderItems} />
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
