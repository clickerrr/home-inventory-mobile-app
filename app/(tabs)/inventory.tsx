import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import GlobalStyles from '@/styles/GlobalStyles';
import InventoryStyles from '@/styles/InventoryStyles';
import { useEffect, useState } from 'react';
import { house, rooms } from '@/sampleData/RoomSelectorSampleData';
import { Room } from '@/types/Room';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';
const Inventory = () => {
    const [roomsData, setRoomsData] = useState<Room[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        axios.get(`${baseUrl}/rooms`).then((response) => {
            console.log(response.data);
            setRoomsData(response.data);
            setIsLoading(false);
        });
    }, []);
    return (
        <View style={InventoryStyles.container}>
            <View style={InventoryStyles.content}>
                <Text style={[GlobalStyles.subHeader, InventoryStyles.subHeader]}>Tap on a room to see details</Text>
                {isLoading ? (
                    <LoadingSpinner textToDisplay="Loading Rooms... " />
                ) : (
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
                                <Text style={GlobalStyles.buttonText}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
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
