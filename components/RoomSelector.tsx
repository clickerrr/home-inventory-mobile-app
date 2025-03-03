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
interface RoomSelectorProps {
    handleNext: (location: Location) => void;
    handleCancel: () => void;
}
const RoomSelector = ({ handleNext, handleCancel }: RoomSelectorProps) => {
    const [dropdownValue, setDropdownValue] = useState(undefined);
    const [locationDropdownValue, setLocationDropdownValue] =
        useState(undefined);
    const [locationsData, setLocationsData] = useState<Location[]>([]);

    return (
        <>
            <View style={RoomSelectorStyles.content}>
                <View style={RoomSelectorStyles.container}>
                    <Text
                        style={[
                            GlobalStyles.subHeader,
                            RoomSelectorStyles.subHeader,
                        ]}
                    >
                        Select Room
                    </Text>
                    <Dropdown
                        style={RoomSelectorStyles.dropdown}
                        data={rooms}
                        labelField="title"
                        valueField="id"
                        value={dropdownValue}
                        onChange={(value) => {
                            console.log(value.id);
                            setDropdownValue(value.id);

                            const locationsList: Location[] = locations.filter(
                                (element: Location) => {
                                    return element.room === value.id;
                                }
                            );
                            setLocationsData(locationsList);
                            setLocationDropdownValue(undefined);
                        }}
                    />
                </View>
                {dropdownValue ? (
                    <View style={RoomSelectorStyles.container}>
                        <Text
                            style={[
                                GlobalStyles.subHeader,
                                RoomSelectorStyles.subHeader,
                            ]}
                        >
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
            <View
                style={[
                    RoomSelectorStyles.container,
                    RoomSelectorStyles.buttonContainer,
                ]}
            >
                <TouchableOpacity
                    disabled={locationDropdownValue === undefined}
                    style={[
                        GlobalStyles.buttonMain,
                        locationDropdownValue === undefined
                            ? GlobalStyles.buttonMainDisabled
                            : '',
                    ]}
                    onPress={() => {
                        const foundLocation: Location | undefined =
                            locations.find((element: Location) => {
                                return locationDropdownValue === element.id;
                            });
                        if (foundLocation === undefined) {
                            console.error(
                                'Location not found in location array'
                            );
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
                    <Text style={GlobalStyles.buttonCancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};
export default RoomSelector;
