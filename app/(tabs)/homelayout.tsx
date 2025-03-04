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
        console.log('Updating house');
    }, [house]);

    return (
        <View style={GlobalStyles.container}>
            <Text style={[HomeLayoutStyles.subHeader, GlobalStyles.subHeader]}>
                Select a Household
            </Text>
            <View style={HomeLayoutStyles.content}>
                <Dropdown
                    style={HomeLayoutStyles.dropdown}
                    value={selectedHouseId}
                    onChange={(item) => {
                        setSelectedHouseId(item.id);
                        console.log(house);
                        setSelectedHouse(item);
                        const roomsInHouse: number[] = house.rooms;

                        const roomsMatchup: Room[] = [];

                        rooms.forEach((element: Room) => {
                            if (roomsInHouse.includes(element.id)) {
                                roomsMatchup.push(element);
                            }
                        });
                        setAvailableRooms(roomsMatchup);
                    }}
                    mode={'default'}
                    data={[houseData]}
                    labelField={'title'}
                    valueField={'id'}
                ></Dropdown>
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
                                            pathname: `/inventory_screens/locationsview/${item.id}`,
                                            params: {
                                                location: JSON.stringify(item),
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
