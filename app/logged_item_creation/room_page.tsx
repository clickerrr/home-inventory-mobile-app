import { LoggedItem } from '@/types/LoggedItem';
import { Location } from '@/types/Location';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '@/styles/GlobalStyles';
import sampleLoggedItems from '@/sampleData/SampleLoggedItems';
import InventorySelector from '@/components/InventorySelector';
import { getRequest } from '@/utils/RequestHandler';
import { toLog } from '@/utils/ConsoleLog';
import { sortObjectsById } from '@/utils/SortObjects';
import { House } from '@/types/House';
import HouseListDropdown from '@/components/HouseListDropdown';
import RoomSelectorStyles from '@/styles/RoomSelectorStyles';
import { Dropdown } from 'react-native-element-dropdown';
import { Inventory } from '@/types/Inventory';

const RoomPage = () => {
    const [houseData, setHouseData] = useState<House[]>([]);
    const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
    const [dropdownValue, setDropdownValue] = useState(undefined);
    const [locationDropdownValue, setLocationDropdownValue] = useState(undefined);
    const [locationsData, setLocationsData] = useState<Location[]>([]);
    const [roomList, setRoomList] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [inventoryList, setInventoryList] = useState<Inventory[]>([]);
    const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
    const { associatedProduct, itemExpirationDate, quantity } = useLocalSearchParams();

    useEffect(() => {
        getRequest('houses').then((result) => {
            const houses: House[] = result;
            toLog(`${JSON.stringify(result)}`);
            const sortedHouses = sortObjectsById(houses);
            console.log('sortedHouses', sortedHouses);

            setHouseData(sortedHouses);
        });
    }, []);

    const addWeeksToDate = (dateObj: Date, numberOfWeeks: number) => {
        const newDateObj = new Date(dateObj);
        newDateObj.setDate(dateObj.getDate() + numberOfWeeks * 7);
        return newDateObj;
    };

    const today = new Date();

    const handleFinishProduct = (location: Location): LoggedItem => {
        const parsedProduct: selectedInventory = JSON.parse(associatedProduct);
        console.log('parsedproduct', parsedProduct);
        if (selectedInventory === null) {
            throw new Error('Inventory can not be null');
        }
        const newLoggedItem: LoggedItem = {
            id: sampleLoggedItems.length,
            dateLogged: today.toISOString(),
            expirationDate: itemExpirationDate ? itemExpirationDate : null,
            consumeByDate: itemExpirationDate ? itemExpirationDate : null,
            product: parsedProduct,
            location: location,
            inventory: selectedInventory,
        };
        return newLoggedItem;
    };

    const clearSelections = () => {
        setDropdownValue(undefined);
        setLocationDropdownValue(undefined);
        setSelectedInventory(null);
    };

    const selectHouse = (houseToSelect: House) => {
        toLog(`${JSON.stringify(houseToSelect)}`, 'selectHouse', 'logged_item_creation/room_page');

        const rooms = houseToSelect.rooms;
        const sortedRooms = sortObjectsById(rooms);

        setRoomList(sortedRooms);
        setLocationsData([]);

        clearSelections();

        setSelectedHouse(houseToSelect);
        setInventoryList(sortObjectsById(houseToSelect.inventories));
    };

    const handleNext = (location: Location) => {
        const loggedItem = handleFinishProduct(location);
        console.log('associatedProduct', associatedProduct);
        router.push({
            pathname: '/logged_item_creation/confirm_logged_item',
            params: {
                loggedItem: JSON.stringify(loggedItem),
                associatedProduct: associatedProduct,
                houseTitle: selectedHouse.title,
                roomTitle: dropdownValue.title,
                location: JSON.stringify(location),
                quantity: quantity,
            },
        });
    };

    const handleChangeInventoryDropdown = (value: Inventory) => {
        console.log(value);
        setSelectedInventory(value);
    };

    return (
        <View style={GlobalStyles.container}>
            <View style={RoomSelectorStyles.content}>
                <View style={RoomSelectorStyles.container}>
                    <Text style={[GlobalStyles.subHeader, RoomSelectorStyles.subHeader]}>Select House</Text>
                    <HouseListDropdown houseList={houseData} setSelectedHouse={selectHouse} />
                </View>
                <View style={RoomSelectorStyles.container}>
                    {selectedHouse ? (
                        <>
                            <Text style={[GlobalStyles.subHeader, RoomSelectorStyles.subHeader]}>Select Inventory</Text>
                            <Dropdown
                                style={RoomSelectorStyles.dropdown}
                                onChange={handleChangeInventoryDropdown}
                                data={inventoryList}
                                value={selectedInventory}
                                labelField={'title'}
                                valueField={'id'}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </View>
                <View style={RoomSelectorStyles.container}>
                    {roomList.length !== 0 && selectedInventory !== null ? (
                        <>
                            <Text style={[GlobalStyles.subHeader, RoomSelectorStyles.subHeader]}>Select Room</Text>
                            <Dropdown
                                style={RoomSelectorStyles.dropdown}
                                data={roomList}
                                labelField="title"
                                valueField="id"
                                value={dropdownValue}
                                onChange={(value) => {
                                    setDropdownValue(value);

                                    setLocationsData(sortObjectsById(value.locations));
                                    setLocationDropdownValue(undefined);
                                }}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </View>
                {locationsData.length !== 0 ? (
                    <View style={RoomSelectorStyles.container}>
                        <Text style={[GlobalStyles.subHeader, RoomSelectorStyles.subHeader]}>
                            Select Location in Room
                        </Text>

                        <Dropdown
                            style={RoomSelectorStyles.dropdown}
                            data={locationsData}
                            labelField="title"
                            valueField="id"
                            value={locationDropdownValue}
                            onChange={(value) => {
                                setLocationDropdownValue(value.id);
                            }}
                        />
                    </View>
                ) : (
                    <></>
                )}
            </View>
            <View style={[RoomSelectorStyles.container, RoomSelectorStyles.buttonContainer]}>
                <TouchableOpacity
                    disabled={locationDropdownValue === undefined}
                    style={[
                        GlobalStyles.buttonMain,
                        locationDropdownValue === undefined ? GlobalStyles.buttonMainDisabled : '',
                    ]}
                    onPress={() => {
                        const foundLocation: Location | undefined = locationsData.find((element: Location) => {
                            return locationDropdownValue === element.id;
                        });
                        if (foundLocation === undefined) {
                            console.error('Location not found in location array');
                            return;
                        }
                        console.log('FOUND LOCATION', foundLocation);
                        handleNext(foundLocation);
                    }}
                >
                    <Text style={GlobalStyles.buttonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.buttonCancel}
                    onPress={() => {
                        router.back();
                    }}
                >
                    <Text style={GlobalStyles.buttonCancelText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RoomPage;
