import { Room } from '@/types/Room';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { locations } from '@/sampleData/RoomSelectorSampleData';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Location } from '@/types/Location';
import GlobalStyles from '@/styles/GlobalStyles';
import InventoryStyles from '@/styles/InventoryStyles';

const RoomDetailView = () => {
    const { id, room } = useLocalSearchParams();
    const [roomDetails, setRoomDetails] = useState<Room | undefined>(undefined);
    const [roomLocations, setRoomLocations] = useState<Location[]>([]);

    useEffect(() => {
        const parsedRoom: Room = JSON.parse(room);
        setRoomDetails(parsedRoom);

        const roomLocations: number[] = parsedRoom.locations;
        const validLocations: Location[] = [];
        locations.forEach((location: Location) => {
            if (roomLocations.includes(location.id)) {
                validLocations.push(location);
            }
        });
        setRoomLocations(validLocations);
    }, [id, room, locations]);
    return (
        <View style={GlobalStyles.container}>
            <View style={InventoryStyles.headerContainer}>
                <Text
                    style={[
                        GlobalStyles.headerText,
                        InventoryStyles.headerText,
                    ]}
                >
                    {roomDetails?.title}
                </Text>
                <Text style={GlobalStyles.subHeader}>
                    Tap on a room to see whats inside
                </Text>
            </View>
            <FlatList
                style={InventoryStyles.list}
                data={roomLocations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            router.navigate({
                                pathname: `/inventory_screens/locationsview/${item.id}`,
                                params: { location: JSON.stringify(item) },
                            });
                        }}
                        key={item.id}
                        style={InventoryStyles.button}
                    >
                        <Text style={InventoryStyles.buttonText}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={GlobalStyles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        console.log(roomDetails);
                        router.navigate({
                            pathname: '/homelayout_screens/newlocation',
                            params: { paramRoom: JSON.stringify(roomDetails) },
                        });
                    }}
                    style={GlobalStyles.buttonMain}
                >
                    <Text style={GlobalStyles.buttonText}>
                        Add New Location
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default RoomDetailView;
