import LoadingSpinner from '@/components/LoadingSpinner';
import GlobalStyles from '@/styles/GlobalStyles';
import HomeLayoutStyles from '@/styles/HomeLayoutStyles';
import { House } from '@/types/House';
import { Room } from '@/types/Room';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActionSheetIOS, FlatList, Text, TouchableOpacity, View, Alert } from 'react-native';
import { sortObjectsById } from '@/utils/SortObjects';
import { deleteRequest, getRequest, putRequest } from '@/utils/RequestHandler';
import { toLog } from '@/utils/ConsoleLog';
import HouseListDropdown from '@/components/HouseListDropdown';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const HomeLayout = () => {
    const [houseData, setHouseData] = useState<House[]>([]);
    const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
    const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refreshHouseRooms = () => {
        toLog('refreshHouseRooms call');
        if (selectedHouse === null) return;
        getRequest(`rooms?houseId=${selectedHouse.id}`).then((result) => {
            toLog(`result ${result}`, 'refreshHouseRooms', 'HomeLayout');
            setAvailableRooms(sortObjectsById(result));
        });
    };

    const loadData = () => {
        getRequest('houses').then((result) => {
            toLog(`${JSON.stringify(result)}`, 'loadData', '(tabs)/homeLayout');

            setHouseData(result);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (selectedHouse !== null) {
                console.log('!!!!getting rooms');
                refreshHouseRooms();
            }
        }, [selectedHouse])
    );

    if (isLoading) {
        return <LoadingSpinner textToDisplay={'Loading...'} color={'black'} textSize={null} />;
    }

    const remoteDeleteItem = (item) => {
        toLog(`Deleting ${JSON.stringify(item)}`, 'remoteDeleteItem', 'homelayout');
        deleteRequest(`rooms/${item.id}`)
            .then((result) => {
                refreshHouseRooms();
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
                refreshHouseRooms();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const selectHouse = (houseToSelect: House) => {
        toLog(`Selecting house ${houseToSelect.id} `, 'selectHouse', '(tabs)/homelayout');
        setSelectedHouse(houseToSelect);
        setAvailableRooms(sortObjectsById(houseToSelect.rooms));
    };

    const handleAddNewHouse = () => {
        toLog('Adding new house', 'handleAddNewHouse', '(tabs)/homelayout');
        router.push('/homelayout_screens/newhouse');
    };

    return (
        <View style={GlobalStyles.container}>
            <View style={HomeLayoutStyles.header}>
                <View style={HomeLayoutStyles.headerVerticalSection}>
                    <HouseListDropdown houseList={houseData} setSelectedHouse={selectHouse} />
                    <TouchableOpacity onPress={handleAddNewHouse}>
                        <MaterialIcons name={'add-circle'} color={'green'} size={30} />
                    </TouchableOpacity>
                </View>
                <Text style={GlobalStyles.headerText}>{selectedHouse !== null ? selectedHouse.title : ''}</Text>
            </View>
            <View style={HomeLayoutStyles.content}>
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
                    </>
                ) : (
                    <View style={HomeLayoutStyles.list}></View>
                )}
                {selectedHouse ? (
                    <View style={GlobalStyles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                router.navigate({
                                    pathname: '/homelayout_screens/newroom',
                                    params: {
                                        houseId: selectedHouse.id,
                                        houseObj: JSON.stringify(selectedHouse),
                                    },
                                });
                            }}
                            style={GlobalStyles.buttonMain}
                        >
                            <Text style={GlobalStyles.buttonText}>Add New Room</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <></>
                )}
            </View>
        </View>
    );
};

export default HomeLayout;
