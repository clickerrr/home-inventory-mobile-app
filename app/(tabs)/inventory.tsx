import { Alert, View, Text, TouchableOpacity, FlatList, Image, ActionSheetIOS } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import GlobalStyles from '@/styles/GlobalStyles';
import InventoryStyles from '@/styles/InventoryStyles';
import { useCallback, useEffect, useState } from 'react';
import { house } from '@/sampleData/RoomSelectorSampleData';
import { Room } from '@/types/Room';
import LoadingSpinner from '@/components/LoadingSpinner';
import { deleteRequest, getRequest, putRequest } from '@/utils/RequestHandler';
import { sortObjectsById } from '@/utils/SortObjects';
import { House } from '@/types/House';
const Inventory = () => {
    const [roomsData, setRoomsData] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = () => {
        getRequest('houses').then((result) => {
            const foundHouse = result.find((house: House) => {
                return house.title === 'Swiech House';
            });
            if (foundHouse === undefined) {
                setRoomsData([]);
            } else {
                setRoomsData(sortObjectsById(foundHouse.rooms));
            }
            setIsLoading(false);
        });
    };

    const remoteDeleteItem = (item) => {
        console.log(item);
        deleteRequest(`rooms/${item.id}`)
            .then((response) => {
                loadData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const remoteUpdateItem = (item, newTitle) => {
        item.title = newTitle;
        console.log(item);

        putRequest(`rooms/${item.id}`, item)
            .then((result) => {
                loadData();
            })
            .catch((error) => {
                console.log(error);
            });
    };
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
                        ListEmptyComponent={() => {
                            return (
                                <View style={InventoryStyles.emptyContainer}>
                                    <Text style={GlobalStyles.text}>
                                        No Rooms Yet. Tap Add New Room to Make a New Room
                                    </Text>
                                </View>
                            );
                        }}
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
                                                remoteDeleteItem(item);
                                            }
                                        }
                                    );
                                }}
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
                        keyExtractor={(item) => item.id}
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
                                houseId: 1,
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
