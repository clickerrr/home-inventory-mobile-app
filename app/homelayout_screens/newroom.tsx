import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GlobalStyles from '@/styles/GlobalStyles';
import { House } from '@/types/House';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { house, locations, rooms } from '@/sampleData/RoomSelectorSampleData';
import NewRoomStyles from '@/styles/NewRoomStyles';
import { Location } from '@/types/Location';
import { Room } from '@/types/Room';

const NewRoom = () => {
    const { houseId, houseObj } = useLocalSearchParams();
    const [selectedHouse, setSelectedHouse] = useState<House>(null);
    const [roomText, setNewRoomText] = useState<string>('');
    const [newLocationText, setNewLocationText] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isLocationFocused, setIsLocationFocused] = useState<boolean>(false);
    const [settingNewLocationName, setSettingNewLocationName] =
        useState<boolean>(false);
    const [newLocations, setNewLocations] = useState<Location[]>([]);
    const [currentRoom, setCurrentRoom] = useState<Room>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    useEffect(() => {
        const parsedHouse: House = JSON.parse(houseObj);
        setSelectedHouse(parsedHouse);
        setCurrentRoom({
            id: rooms.length,
            title: roomText,
            locations: [],
            house: parsedHouse.id,
        });
    }, [houseId, house]);
    return (
        <View style={GlobalStyles.container}>
            <View style={NewRoomStyles.content}>
                <View style={NewRoomStyles.textInputContainer}>
                    <Text style={[NewRoomStyles.label]}>
                        Enter New Room Name
                    </Text>
                    <TextInput
                        style={[
                            NewRoomStyles.input,
                            isFocused && NewRoomStyles.inputFocused,
                        ]}
                        placeholder="Enter new room name..."
                        placeholderTextColor="#999"
                        value={roomText}
                        onChangeText={setNewRoomText}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </View>
                <View
                    style={[
                        NewRoomStyles.newLocationContainer,
                        NewRoomStyles.container,
                    ]}
                >
                    {settingNewLocationName ? (
                        <TextInput
                            style={[
                                NewRoomStyles.input,
                                isLocationFocused && NewRoomStyles.inputFocused,
                            ]}
                            placeholder="Enter new location name..."
                            placeholderTextColor="#999"
                            value={newLocationText}
                            onChangeText={setNewLocationText}
                            onFocus={() => setIsLocationFocused(true)}
                            onBlur={() => setIsLocationFocused(false)}
                        />
                    ) : (
                        <></>
                    )}
                </View>
                <View
                    style={[
                        NewRoomStyles.newLocationButtonsContainer,
                        NewRoomStyles.container,
                    ]}
                >
                    {settingNewLocationName ? (
                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    setSettingNewLocationName(
                                        (current) => !current
                                    );
                                }}
                                style={[
                                    GlobalStyles.buttonCancel,
                                    NewRoomStyles.newLocationButton,
                                ]}
                            >
                                <Text style={GlobalStyles.buttonCancelText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setSettingNewLocationName(
                                        (current) => !current
                                    );
                                    const newLocation: Location = {
                                        id:
                                            locations.length +
                                            newLocations.length,
                                        title: newLocationText,
                                        room: currentRoom.id,
                                        loggedItems: [],
                                    };
                                    setNewLocations([
                                        ...newLocations,
                                        newLocation,
                                    ]);
                                    currentRoom.locations.push(newLocation.id);
                                    setNewLocationText('');
                                }}
                                style={[
                                    GlobalStyles.buttonMain,
                                    NewRoomStyles.newLocationButton,
                                ]}
                            >
                                <Text style={GlobalStyles.buttonText}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                setSettingNewLocationName(
                                    (current) => !current
                                );
                            }}
                            style={GlobalStyles.buttonMain}
                        >
                            <Text style={GlobalStyles.buttonText}>
                                Add New Location
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <FlatList
                    style={NewRoomStyles.list}
                    data={newLocations}
                    renderItem={({ item }) => (
                        <View style={NewRoomStyles.listButtonContainer}>
                            <TouchableOpacity style={NewRoomStyles.listButton}>
                                <Text style={GlobalStyles.buttonText}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    const updatedLocations =
                                        newLocations.filter(
                                            (element: Location) => {
                                                return element.id !== item.id;
                                            }
                                        );
                                    setNewLocations(updatedLocations);
                                }}
                                style={NewRoomStyles.listButtonDelete}
                            >
                                <AntDesign
                                    size={32}
                                    name="minuscircleo"
                                    color={'#FF312E'}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            <View style={GlobalStyles.buttonContainer}>
                <TouchableOpacity
                    disabled={roomText.trim().length == 0}
                    onPress={() => {
                        setModalVisible(true);
                    }}
                    style={[
                        GlobalStyles.buttonMain,
                        roomText.trim().length == 0
                            ? GlobalStyles.buttonMainDisabled
                            : '',
                    ]}
                >
                    <Text style={GlobalStyles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={GlobalStyles.modalScreen}>
                    <View style={GlobalStyles.modalView}>
                        <Text
                            style={[
                                NewRoomStyles.subHeader,
                                GlobalStyles.subHeader,
                            ]}
                        >
                            Confirm New Room
                        </Text>
                        <View style={[NewRoomStyles.container]}>
                            <Text style={GlobalStyles.subHeader}>
                                Room Title:
                            </Text>
                            <Text style={GlobalStyles.largeText}>
                                {roomText}
                            </Text>
                            {newLocations.length !== 0 ? (
                                <>
                                    <Text style={GlobalStyles.subHeader}>
                                        Locations:
                                    </Text>
                                    {newLocations.map((location: Location) => {
                                        return (
                                            <Text
                                                key={location.id}
                                                style={GlobalStyles.largeText}
                                            >
                                                {location.title}
                                            </Text>
                                        );
                                    })}
                                </>
                            ) : (
                                <></>
                            )}
                        </View>
                        <View
                            style={[
                                GlobalStyles.buttonContainer,
                                GlobalStyles.modalButtonContainer,
                            ]}
                        >
                            <TouchableOpacity
                                style={[GlobalStyles.buttonMain]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    console.log(currentRoom);
                                    currentRoom.title = roomText;
                                    rooms.push(currentRoom);
                                    newLocations.forEach(
                                        (newLocation: Location) => {
                                            locations.push(newLocation);
                                        }
                                    );
                                    house.rooms.push(currentRoom.id);
                                    router.back();
                                }}
                            >
                                <Text style={GlobalStyles.buttonText}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[GlobalStyles.buttonCancel]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={GlobalStyles.buttonCancelText}>
                                    Edit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default NewRoom;
