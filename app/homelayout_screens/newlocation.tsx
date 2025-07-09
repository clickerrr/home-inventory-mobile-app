import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import GlobalStyles from '@/styles/GlobalStyles';
import HomeLayoutStyles from '@/styles/HomeLayoutStyles';
import { router, useLocalSearchParams } from 'expo-router';
import NewLocationStyles from '@/styles/NewLocationStyles';
import { useEffect, useState } from 'react';
import { Room } from '@/types/Room';
import { Location } from '@/types/Location';
import axios from 'axios';

const NewLocationScreen = () => {
    const { paramRoom } = useLocalSearchParams();
    const [room, setRoom] = useState<Room | undefined>(undefined);
    useEffect(() => {
        const parsedRoom: Room = JSON.parse(paramRoom);
        console.log('room: ', parsedRoom);
        setRoom(parsedRoom);
    }, [paramRoom]);
    const [locationTitleText, setLocationTitleText] = useState('');
    const [locationTitleFocused, setLocationTitleFocused] = useState(false);

    const handleAddNewLocation = () => {
        if (room === undefined) {
            return;
        }
        const newLocationToAdd: Location = {
            title: locationTitleText,
            loggedItems: [],
        };
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        axios.post(`${baseUrl}/locations?roomId=${room.id}`, newLocationToAdd).then(() => {
            router.back();
        });
    };

    return (
        <View style={GlobalStyles.container}>
            <View style={HomeLayoutStyles.content}>
                <Text style={HomeLayoutStyles.subHeader}>New Location</Text>
                <TextInput
                    style={[NewLocationStyles.input]}
                    placeholder="Enter location name..."
                    placeholderTextColor="#999"
                    value={locationTitleText}
                    onChangeText={setLocationTitleText}
                    onFocus={() => setLocationTitleFocused(true)}
                    onBlur={() => setLocationTitleFocused(false)}
                />
            </View>
            <View style={GlobalStyles.buttonContainer}>
                <TouchableOpacity
                    style={GlobalStyles.buttonMain}
                    onPress={() => {
                        handleAddNewLocation();
                    }}
                >
                    <Text style={GlobalStyles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.buttonCancel}
                    onPress={() => {
                        router.back();
                    }}
                >
                    <Text style={GlobalStyles.buttonCancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NewLocationScreen;
