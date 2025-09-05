import UserAdder from '@/components/UserAdder';
import GlobalStyles from '@/styles/GlobalStyles';
import NewHouseStyles from '@/styles/views/NewHouseStyles';
import { House } from '@/types/House';
import { UserInformation } from '@/types/UserInformation';
import { postRequest } from '@/utils/RequestHandler';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

const NewHouse = () => {
    const [houseTitle, setHouseTitle] = useState<string>('');
    const [houseTitleFocused, setHouseTitleFocused] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [userList, setUserList] = useState<UserInformation[]>([]);

    const errorCheck = (fieldToCheck: string, fieldTitle: string): boolean => {
        if (fieldToCheck.trim().length == 0) {
            setErrorMessage(`${fieldTitle} can not be empty`);
            return true;
        }
        return false;
    };

    const handleCreateNewHouse = () => {
        if (errorCheck(houseTitle, 'House title')) {
            return;
        }

        // get the house title
        // get the list of users that we want to associate with it
        // create the house
        // get response, tell user if all users were present
        // house successfully added or not?
        // redirect

        const newHouse: House = {
            title: houseTitle,
            rooms: [],
        };

        postRequest(`houses`, newHouse).then((response) => {
            console.log(response);
            Alert.alert('Success', `Successfully added new house: ${newHouse.title}`, [
                {
                    text: 'OK',
                    onPress: () => {
                        router.back();
                    },
                },
            ]);
        });
    };

    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <View style={NewHouseStyles.headerContent}>
                    <Text style={[GlobalStyles.headerText]}>Create A New House</Text>
                </View>
                <View style={NewHouseStyles.content}>
                    <TextInput
                        style={[NewHouseStyles.input, houseTitleFocused ? NewHouseStyles.inputFocused : null]}
                        placeholder="Enter House Name"
                        placeholderTextColor="#999"
                        value={houseTitle}
                        onChangeText={setHouseTitle}
                        onFocus={() => setHouseTitleFocused(true)}
                        onBlur={() => setHouseTitleFocused(false)}
                    />
                    <View style={NewHouseStyles.userAdderContainer}>
                        <UserAdder tiedUserData={userList} setTiedUserData={setUserList} />
                    </View>
                </View>
                <View style={NewHouseStyles.footerContent}>
                    <Text style={NewHouseStyles.errorMessage}>{errorMessage}</Text>
                    <TouchableOpacity onPress={() => handleCreateNewHouse()} style={[GlobalStyles.buttonMain]}>
                        <Text style={[GlobalStyles.buttonText]}>Create New House</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default NewHouse;
