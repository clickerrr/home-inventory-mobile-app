import { house, rooms } from '@/sampleData/RoomSelectorSampleData';
import GlobalStyles from '@/styles/GlobalStyles';
import HomeLayoutStyles from '@/styles/HomeLayoutStyles';
import { House } from '@/types/House';
import { Room } from '@/types/Room';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const HomeLayout = () => {
    const [houseData, setHouseData] = useState<House>(house);
    const [selectedHouseId, setSelectedHouseId] = useState<number>(-1);
    const [selectedHouse, setSelectedHouse] = useState<House>(null);
    const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

    useEffect(() => {
        setHouseData(house);
        setSelectedHouse(house);
        setAvailableRooms(rooms);
    }, [house, rooms]);

    return (
        <View style={GlobalStyles.container}>
            <View style={HomeLayoutStyles.content}>
                {availableRooms.length !== 0 ? (
                    <>
                        <FlatList
                            style={HomeLayoutStyles.list}
                            data={availableRooms}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        router.navigate({
                                            pathname: `/inventory_screens/${item.id}`,
                                            params: {
                                                room: JSON.stringify(item),
                                            },
                                        });
                                    }}
                                    key={item.id}
                                    style={HomeLayoutStyles.button}
                                >
                                    <Text style={HomeLayoutStyles.buttonText}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <View style={GlobalStyles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    router.navigate({
                                        pathname: '/homelayout_screens/newroom',
                                        params: {
                                            houseId: selectedHouseId,
                                            houseObj:
                                                JSON.stringify(selectedHouse),
                                        },
                                    });
                                }}
                                style={GlobalStyles.buttonMain}
                            >
                                <Text style={GlobalStyles.buttonText}>
                                    Add New Room
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <></>
                )}
            </View>
        </View>
    );
};

export default HomeLayout;
