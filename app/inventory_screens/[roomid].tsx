import { Room } from '@/types/Room';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { locations } from '@/sampleData/RoomSelectorSampleData';
import { ActionSheetIOS, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Location } from '@/types/Location';
import GlobalStyles from '@/styles/GlobalStyles';
import InventoryStyles from '@/styles/InventoryStyles';
import axios from 'axios';
import { sortObjectsById } from '@/utils/SortObjects';

const RoomDetailView = () => {
    const { id, room } = useLocalSearchParams();
    const [roomDetails, setRoomDetails] = useState<Room | undefined>(undefined);
    const [roomLocations, setRoomLocations] = useState<Location[]>([]);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );
    const loadData = () => {
        const parsedRoom: Room = JSON.parse(room);
        setRoomDetails(parsedRoom);

        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        axios.get(`${baseUrl}/rooms/${parsedRoom.id}/locations`).then((response) => {
            console.log('locations response', response.data);
            const locationsResponse = response.data;
            const sortedLocations = sortObjectsById(locationsResponse);
            setRoomLocations(sortedLocations);
        });
    };

    const remoteDeleteItem = (item) => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        console.log(item);
        axios
            .delete(`${baseUrl}/locations/${item.id}`)
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
            .put(`${baseUrl}/locations/${item.id}`, item)
            .then((response) => {
                loadData();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <View style={GlobalStyles.container}>
            <View style={InventoryStyles.headerContainer}>
                <Text style={GlobalStyles.subHeader}>Tap on a room to see whats inside</Text>
                <Text style={[GlobalStyles.headerText, InventoryStyles.headerText]}>{roomDetails?.title}</Text>
            </View>

            <FlatList
                style={InventoryStyles.list}
                data={roomLocations}
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
                                pathname: `/inventory_screens/locationsview/${item.id}`,
                                params: { location: JSON.stringify(item) },
                            });
                        }}
                        key={item.id}
                        style={InventoryStyles.button}
                    >
                        <Text style={InventoryStyles.buttonText}>{item.title}</Text>
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
                    <Text style={GlobalStyles.buttonText}>Add New Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default RoomDetailView;
