import UserAdder from '@/components/UserAdder';
import GlobalStyles from '@/styles/GlobalStyles';
import HouseManageStyles from '@/styles/views/HouseManageStyles';
import { House } from '@/types/House';
import { UserInformation } from '@/types/UserInformation';
import { logError, toLog } from '@/utils/ConsoleLog';
import { getRequest, postRequest } from '@/utils/RequestHandler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';

const HouseManageUsers = () => {
    const { passedHouse } = useLocalSearchParams();
    useEffect(() => {
        const parsedHouse: House = JSON.parse(passedHouse);
        setHouse(parsedHouse);
        getAllUsers(parsedHouse.id);
    }, [passedHouse]);
    const [house, setHouse] = useState<House | null>(null);

    const [listOfUsers, setListOfUsers] = useState<UserInformation[]>([]);
    const [initialLengthOfList, setInitialLengthOfList] = useState<number>(0);

    const getAllUsers = (houseId: number) => {
        getRequest(`houses/userDetails?houseId=${houseId}`).then((result) => {
            console.log(result);
            setListOfUsers(result);
            setInitialLengthOfList(result.length);
            console.log(result.length);
            console.log(listOfUsers.length);
        });
    };

    const submitUsers = () => {
        if (house === null) return;
        listOfUsers.forEach((user: UserInformation) => {
            postRequest(`houses/userDetails?houseId=${house.id}`, user)
                .then((result) => {
                    toLog(`added user  ${JSON.stringify(user)}`);
                    toLog(result);
                })
                .catch((error) => {
                    logError(error);
                });
        });
        Alert.alert('Success', `Successfully added new users`, [
            {
                text: 'OK',
                onPress: () => {
                    router.back();
                },
            },
        ]);
    };

    const updateUserData = (newListOfUsers: UserInformation[]) => {
        setListOfUsers(newListOfUsers);
    };

    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <View style={HouseManageStyles.headerContent}>
                    <Text style={GlobalStyles.headerText}>Users</Text>
                </View>
                <View style={HouseManageStyles.content}>
                    <View>
                        <UserAdder tiedUserData={listOfUsers} setTiedUserData={updateUserData} />
                    </View>
                </View>
                <View style={HouseManageStyles.footerContent}>
                    <TouchableOpacity
                        style={[
                            GlobalStyles.buttonMain,
                            initialLengthOfList === listOfUsers.length ? GlobalStyles.buttonMainDisabled : '',
                        ]}
                        disabled={initialLengthOfList === listOfUsers.length}
                        onPress={() => {
                            submitUsers();
                        }}
                    >
                        <Text style={GlobalStyles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default HouseManageUsers;
