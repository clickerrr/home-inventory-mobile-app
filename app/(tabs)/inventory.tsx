import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import GlobalStyles from '@/styles/GlobalStyles';
import InventoryStyles from '@/styles/InventoryStyles';
import { useEffect, useState } from 'react';
import { house, rooms } from '@/sampleData/RoomSelectorSampleData';
import { Room } from '@/types/Room';
import icon from '@/assets/images/barcode-logo.png';
const Inventory = () => {
    const [roomsData, setRoomsData] = useState<Room[]>();

    useEffect(() => {
        setRoomsData(rooms);
    }, [rooms]);
    return (
        <View style={InventoryStyles.container}>
            <View style={InventoryStyles.content}>
                <Text
                    style={[GlobalStyles.subHeader, InventoryStyles.subHeader]}
                >
                    Tap on a room to see details
                </Text>
                <FlatList
                    style={InventoryStyles.list}
                    data={roomsData}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                router.navigate({
                                    pathname: `/inventory_screens/${item.id}`,
                                    params: { room: JSON.stringify(item) },
                                });
                            }}
                            style={InventoryStyles.button}
                        >
                            <Text style={GlobalStyles.buttonText}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <View style={GlobalStyles.buttonContainer}>
                <TouchableOpacity
                    style={GlobalStyles.buttonMain}
                    onPress={() => {
                        router.navigate({
                            pathname: '/homelayout_screens/newroom',
                            params: {
                                houseId: 0,
                                houseObj: JSON.stringify(house),
                            },
                        });
                    }}
                >
                    <Text style={GlobalStyles.buttonText}>Add New Room</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.buttonMain}
                    onPress={() => {
                        router.navigate({
                            pathname: '/inventory_screens/productlist',
                        });
                    }}
                >
                    <Text style={GlobalStyles.buttonText}>View Products</Text>
                </TouchableOpacity>
            </View>
            <View></View>
        </View>
    );
};
export default Inventory;
