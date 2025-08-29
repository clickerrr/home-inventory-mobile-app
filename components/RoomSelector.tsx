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
interface RoomSelectorProps {
    handleNext: (location: Location) => void;
    handleCancel: () => void;
    cancelText: string;
}
const RoomSelector = ({ handleNext, handleCancel, cancelText }: RoomSelectorProps) => {
    const [dropdownValue, setDropdownValue] = useState(undefined);
    const [locationDropdownValue, setLocationDropdownValue] = useState(undefined);
    const [locationsData, setLocationsData] = useState<Location[]>([]);
    const [roomList, setRoomList] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getRequest('rooms').then((result) => {
            const rooms: Room[] = result;
            const sortedRooms = sortObjectsById(rooms);
            console.log('rooms', sortedRooms);
            setRoomList(sortedRooms);
            sortedRooms.forEach((room: Room) => {
                console.log(room.id, room.title);
                const sortedLocations = sortObjectsById(room.locations);
                sortedLocations.forEach((location: Location) => {
                    console.log(location.id, location.title);
                });
            });
        });
    }, []);

    return (
        <>
            <View style={RoomSelectorStyles.content}>
                <View style={RoomSelectorStyles.container}>
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
                            setLocationsData(foundRoom.locations);
                            setLocationDropdownValue(undefined);
                        }}
                    />
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
