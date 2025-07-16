import LoadingSpinner from '@/components/LoadingSpinner';
import { house, rooms } from '@/sampleData/RoomSelectorSampleData';
import GlobalStyles from '@/styles/GlobalStyles';
import HomeLayoutStyles from '@/styles/HomeLayoutStyles';
import { House } from '@/types/House';
import { Room } from '@/types/Room';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActionSheetIOS, FlatList, Text, TouchableOpacity, View, Alert } from 'react-native';
import axios from 'axios';
import { sortObjectsById } from '@/utils/SortObjects';

const HomeLayout = () => {
    const [houseData, setHouseData] = useState<House>(null);
    const [selectedHouseId, setSelectedHouseId] = useState<number>(-1);
    const [selectedHouse, setSelectedHouse] = useState<House>(null);
    const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = () => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        axios.get(`${baseUrl}/houses`).then((response) => {
            const houseResponse = response.data[0];
            setHouseData(houseResponse);
            setSelectedHouse(houseResponse);
            setAvailableRooms(sortObjectsById(houseResponse.rooms));
            setIsLoading(false);
        });
    };

    if (isLoading) {
        return <LoadingSpinner textToDisplay={'Loading...'} color={'black'} />;
    }

    const remoteDeleteItem = (item) => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        console.log(item);
        axios
            .delete(`${baseUrl}/rooms/${item.id}`)
            .then((response) => {
                loadData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const remoteUpdateItem = (item, newTitle) => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        item.title = newTitle;
        console.log(item);
        axios
            .put(`${baseUrl}/rooms/${item.id}`, item)
            .then((response) => {
                loadData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={GlobalStyles.container}>
            <View style={HomeLayoutStyles.content}>
                <Text style={[GlobalStyles.headerText, { fontWeight: 'bold' }]}>{houseData.title}</Text>
                {availableRooms.length !== 0 ? (
                    <>
                        <FlatList
                            style={HomeLayoutStyles.list}
                            data={availableRooms}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onLongPress={({ target }) => {
                                        ActionSheetIOS.showActionSheetWithOptions(
                                            {
                                                options: ['Delete', 'Rename', 'Cancel'],
                                                destructiveButtonIndex: 0,
                                                cancelButtonIndex: 2,
                                                userInterfaceStyle: 'dark',
                                            },
                                            (buttonIndex) => {
                                                if (buttonIndex === 2) {
                                                    // cancel action
                                                } else if (buttonIndex === 1) {
                                                    Alert.prompt('Rename Room', 'Enter new room name', (text) => {
                                                        remoteUpdateItem(item, text);
                                                    });
                                                    // on edit
                                                } else if (buttonIndex === 0) {
                                                    Alert.alert(
                                                        'Confirm Deletion',
                                                        'Are you sure you want to delete this item?',

                                                        [
                                                            {
                                                                text: 'Cancel',
                                                                onPress: () => {},
                                                                style: 'cancel',
                                                            },
                                                            {
                                                                text: 'Confirm',
                                                                onPress: () => {
                                                                    remoteDeleteItem(item);
                                                                },
                                                                style: 'destructive',
                                                            },
                                                        ]
                                                    );
                                                }
                                            }
                                        );
                                    }}
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
                                    <Text style={HomeLayoutStyles.buttonText}>{item.title}</Text>
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
                                            houseObj: JSON.stringify(selectedHouse),
                                        },
                                    });
                                }}
                                style={GlobalStyles.buttonMain}
                            >
                                <Text style={GlobalStyles.buttonText}>Add New Room</Text>
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
