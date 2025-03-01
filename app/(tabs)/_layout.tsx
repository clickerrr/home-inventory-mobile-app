import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: 'green' }}>
			<Tabs.Screen
				name="inventory"
				options={{
					title: 'Inventory',
					tabBarIcon: ({ color }: { color: string }) => (
						<MaterialIcons size={28} name="inventory" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="homelayout"
				options={{
					title: 'Home Layout',
					tabBarIcon: ({ color }: { color: string }) => (
						<AntDesign size={28} name="home" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Scan',
					tabBarIcon: ({ color }: { color: string }) => (
						<AntDesign size={28} name="pluscircle" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Settings',
					tabBarIcon: ({ color }: { color: string }) => (
						<MaterialIcons size={28} name="settings" color={color} />
					),
				}}
			/>
		</Tabs>
	);
};
export default TabsLayout;
