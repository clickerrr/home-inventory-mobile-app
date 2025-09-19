import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useAuthentication } from '@/components/AuthContext';

const TabsLayout = () => {
    const { isAuthenticated } = useAuthentication();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'orange',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Scan',
                    headerShown: false,
                    tabBarIcon: ({ color }: { color: string }) => (
                        <AntDesign size={28} name="plus-circle" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="inventory"
                options={{
                    title: 'Inventory',
                    headerShown: false,
                    tabBarIcon: ({ color }: { color: string }) => (
                        <MaterialIcons size={28} name="inventory" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="homelayout"
                options={{
                    title: 'Home Layout',
                    headerShown: false,
                    tabBarIcon: ({ color }: { color: string }) => <AntDesign size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    headerShown: false,
                    tabBarIcon: ({ color }: { color: string }) => (
                        <MaterialIcons size={28} name="settings" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};
export default TabsLayout;
