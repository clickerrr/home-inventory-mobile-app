import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import GlobalStyles from '@/styles/GlobalStyles';
import { Room } from '@/types/Room';
import { Location } from '@/types/Location';
import { house, locations, rooms } from '@/sampleData/RoomSelectorSampleData';
import { useEffect, useState } from 'react';
import { House } from '@/types/House';
import RoomSelectorStyles from '@/styles/RoomSelectorStyles';
import { TouchableOpacity } from 'react-native';
import { ContainerTypeDropdown } from '@/components/ContainerTypeDropdown';
import axios from 'axios';
import { sortObjectsById } from '@/utils/SortObjects';
import { readFromKeyStore } from '@/utils/KeyStore';
import { getRequest } from '@/utils/RequestHandler';
import HouseListDropdown from '@/components/HouseListDropdown';
import { toLog } from '@/utils/ConsoleLog';
interface RoomSelectorProps {
    handleNext: (location: Location) => void;
    handleCancel: () => void;
    cancelText: string;
}
const RoomSelector = ({ handleNext, handleCancel, cancelText }: RoomSelectorProps) => {
    const [houseData, setHouseData] = useState<House[]>([]);
    const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
    const [dropdownValue, setDropdownValue] = useState(undefined);
    const [locationDropdownValue, setLocationDropdownValue] = useState(undefined);
    const [locationsData, setLocationsData] = useState<Location[]>([]);
    const [roomList, setRoomList] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getRequest('houses').then((result) => {
            const houses: House[] = result;
            toLog(`${JSON.stringify(result)}`);
            const sortedHouses = sortObjectsById(houses);
            console.log('sortedHouses', sortedHouses);

            setHouseData(sortedHouses);
        });
    }, []);

    const clearSelections = () => {
        setDropdownValue(undefined);
        setLocationDropdownValue(undefined);
    };

    const selectHouse = (houseToSelect: House) => {
        toLog(`${JSON.stringify(houseToSelect)}`);

        const rooms = houseToSelect.rooms;
        const sortedRooms = sortObjectsById(rooms);
        setRoomList(sortedRooms);
        setLocationsData([]);
        clearSelections();

        toLog(`sortedRooms ${JSON.stringify(sortedRooms)}`);

        setSelectedHouse(houseToSelect);
    };

    return (
        <>
            <View style={RoomSelectorStyles.content}>
                <View style={RoomSelectorStyles.container}>
                    <Text style={[GlobalStyles.subHeader, RoomSelectorStyles.subHeader]}>Select House</Text>
                    <HouseListDropdown houseList={houseData} setSelectedHouse={selectHouse} />
                </View>
                <View style={RoomSelectorStyles.container}>
                    {roomList.length !== 0 ? (
                        <>
                            <Text style={[GlobalStyles.subHeader, RoomSelectorStyles.subHeader]}>Select Room</Text>
                            <Dropdown
                                style={RoomSelectorStyles.dropdown}
                                data={roomList}
                                labelField="title"
                                valueField="id"
                                value={dropdownValue}
                                onChange={(value) => {
                                    console.log(value.id);
                                    setDropdownValue(value.id);

                                    const foundRoom = roomList.find((room) => {
                                        return room.id === value.id;
                                    });
                                    console.log('foundRoom locations', foundRoom.locations);
                                    setLocationsData(sortObjectsById(foundRoom.locations));
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
                        handleCancel();
                    }}
                >
                    <Text style={GlobalStyles.buttonCancelText}>{cancelText}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};
export default RoomSelector;
