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
import { logError, toLog } from '@/utils/ConsoleLog';
import HouseListDropdown from '@/components/HouseListDropdown';
import { Inventory } from '@/types/Inventory';

const InventoryScreen = () => {
    const [houseList, setHouseList] = useState<House[]>([]);
    const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
    const [inventoryList, setInventoryList] = useState<Inventory[]>([]);
    const [roomsData, setRoomsData] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useFocusEffect(
        useCallback(() => {
            setSelectedHouse(selectedHouse);
            loadInventoryData(selectedHouse);
        }, [selectedHouse])
    );
    useEffect(() => {
        loadHouseData();
    }, []);

    const loadInventoryData = (house: House) => {
        if (house === null) return;
        getRequest(`inventories?houseId=${house.id}`)
            .then((result) => {
                toLog(`loadInventoryData ${JSON.stringify(result)}`, 'loadInventoryData', `inventory`);
                setInventoryList(sortObjectsById(result));
            })
            .catch((error) => {
                logError(error);
            });
    };

    const loadHouseData = () => {
        getRequest('houses').then((result) => {
            setHouseList(result);
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

    const updateSelectedHouse = (houseToSelect: House) => {
        loadInventoryData(houseToSelect);
        setSelectedHouse(houseToSelect);
    };

    const renderEmptyComponent = () => {
        return (
            <View style={InventoryStyles.emptyContainer}>
                <Text style={GlobalStyles.text}>No Rooms Yet. Tap Add New Room to Make a New Room</Text>
            </View>
        );
    };

    const renderEmptyInventoryComponent = () => {
        return (
            <View style={InventoryStyles.emptyContainer}>
                <Text style={GlobalStyles.text}>No inventories yet. Tap create new inventory to create one.</Text>
            </View>
        );
    };

    const renderItem = ({ item }) => {
        return (
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
        );
    };

    const handlePress = (item: Inventory) => {
        router.navigate({
            pathname: `/inventory_screens/${item.id}`,
            params: { inventory: JSON.stringify(item) },
        });
    };

    const renderInventoryListItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    handlePress(item);
                }}
                style={InventoryStyles.button}
            >
                <Text style={GlobalStyles.buttonText}>Inventory: {item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <View style={GlobalStyles.headerContent}>
                    <HouseListDropdown houseList={houseList} setSelectedHouse={updateSelectedHouse} />
                </View>
                <View style={GlobalStyles.content}>
                    <Text style={[GlobalStyles.subHeader, InventoryStyles.subHeader]}>
                        Tap on an inventory to see its details
                    </Text>
                    {isLoading ? (
                        <LoadingSpinner textToDisplay="Loading... " textSize={null} color={null} />
                    ) : (
                        <FlatList
                            style={InventoryStyles.list}
                            data={inventoryList}
                            ListEmptyComponent={renderEmptyInventoryComponent}
                            renderItem={renderInventoryListItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    )}
                </View>
                <View style={GlobalStyles.footerContent}>
                    {selectedHouse !== null ? (
                        <>
                            <TouchableOpacity
                                style={GlobalStyles.buttonMain}
                                onPress={() => {
                                    router.navigate({
                                        pathname: '/inventory_screens/createnewinventory',
                                        params: {
                                            house: JSON.stringify(selectedHouse),
                                        },
                                    });
                                }}
                            >
                                <Text style={GlobalStyles.buttonText}>Create New Inventory</Text>
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
                        </>
                    ) : (
                        <></>
                    )}
                </View>
            </View>
        </View>
    );
};
export default InventoryScreen;
