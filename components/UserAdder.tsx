import ComponentGlobalStyles from '@/styles/ComponentGlobalStyles';
import { useCallback, useEffect, useState } from 'react';
import {
    ActionSheetIOS,
    Alert,
    FlatList,
    ListRenderItemInfo,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import UserInformation from '@/types/UserInformation';
import GlobalStyles from '@/styles/GlobalStyles';
import UserAdderStyles from '@/styles/components/UserAdderStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { toLog } from '@/utils/ConsoleLog';

interface UserAdderProps {
    tiedUserData: UserInformation[];
    setTiedUserData: (userInfo: UserInformation[]) => void;
}

const UserAdder = ({ tiedUserData, setTiedUserData }: UserAdderProps) => {
    const [addingNewUser, setAddingNewUser] = useState<boolean>(false);

    const [usernameInput, setUsernameInput] = useState<string>('');
    const [usernameInputFocused, setUsernameInputFocused] = useState<boolean>(false);

    const [emailInput, setEmailInput] = useState<string>('');
    const [emailInputFocused, setEmailInputFocused] = useState<boolean>(false);

    const [firstNameInput, setFirstNameInput] = useState<string>('');
    const [firstNameInputFocused, setFirstNameInputFocused] = useState<boolean>(false);

    const [lastNameInput, setLastNameInput] = useState<string>('');
    const [lastNameInputFocused, setLastNameInputFocused] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string>('');

    const errorCheck = (fieldToCheck: string, fieldTitle: string): boolean => {
        if (fieldToCheck.trim().length == 0) {
            setErrorMessage(`${fieldTitle} can not be empty`);
            return true;
        }
        return false;
    };

    const renderUserList = ({ item, index }: ListRenderItemInfo<UserInformation>) => {
        toLog(item, 'renderUserList', 'UserAdder');
        return (
            <View style={UserAdderStyles.userListItem} key={index}>
                <View style={UserAdderStyles.userListLeftGroup}>
                    {item.firstName ? (
                        <>
                            <Text style={GlobalStyles.buttonText}>
                                {item.firstName} {item.lastName}
                            </Text>
                            {item.username ? (
                                <Text style={GlobalStyles.buttonText}>{item.username}</Text>
                            ) : item.email ? (
                                <Text style={GlobalStyles.buttonText}>{item.email}</Text>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <>
                            {item.username ? <Text style={GlobalStyles.buttonText}>{item.username}</Text> : <></>}
                            {item.email ? <Text style={GlobalStyles.buttonText}>{item.email}</Text> : <></>}
                        </>
                    )}
                </View>
                <View style={UserAdderStyles.userListRightGroup}>
                    <TouchableOpacity
                        onPress={() => {
                            showDeletionConfirmation(index);
                        }}
                        style={UserAdderStyles.deleteItem}
                    >
                        <MaterialIcons name="delete" size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const deleteFromList = (indexToDelete: number) => {
        console.log(indexToDelete);
        const filteredList = tiedUserData.filter((_, index) => index !== indexToDelete);
        console.log('filteredList', filteredList);
        setTiedUserData(filteredList);
    };

    const showDeletionConfirmation = (indexToDelete: number) => {
        Alert.alert(
            'Confirm Deletion',
            `Are you sure you want to delete user ${tiedUserData[indexToDelete].username}?`,

            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        deleteFromList(indexToDelete);
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const renderFlatList = () => {
        return (
            <>
                <Text style={GlobalStyles.subHeader}>Currently Added Users</Text>
                <FlatList
                    style={UserAdderStyles.userList}
                    contentContainerStyle={UserAdderStyles.userListContainer}
                    data={tiedUserData}
                    renderItem={renderUserList}
                />

                <View style={GlobalStyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => setAddingNewUser((currentState) => !currentState)}
                        style={GlobalStyles.buttonMain}
                    >
                        <Text style={GlobalStyles.buttonText}>Add User</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    };

    const handleConfirmButton = () => {
        if (usernameInput.length !== 0) {
            if (errorCheck(usernameInput, 'Username input')) {
                return;
            }
        }
        if (emailInput.length !== 0) {
            if (errorCheck(emailInput, 'Email input')) {
                return;
            }
        }
        if (emailInput.length === 0 && usernameInput.length === 0) {
            setErrorMessage('Please enter a username or email you wish to add.');
            return;
        }

        if (firstNameInput.length !== 0) {
            if (errorCheck(firstNameInput, 'First Name input')) {
                return;
            }
        }

        if (lastNameInput.length !== 0) {
            if (errorCheck(lastNameInput, 'Last Name input')) {
                return;
            }
        }
        const newUser: UserInformation = {
            username: usernameInput.length !== 0 ? usernameInput : undefined,
            email: emailInput.length !== 0 ? emailInput : undefined,
            firstName: firstNameInput.length !== 0 ? firstNameInput : undefined,
            lastName: lastNameInput.length !== 0 ? lastNameInput : undefined,
        };

        if (checkIfUserAlreadyAdded(newUser)) {
            setErrorMessage('User already added');
            return;
        }

        setUsernameInput('');
        setEmailInput('');
        setFirstNameInput('');
        setLastNameInput('');
        setErrorMessage('');

        setTiedUserData([...tiedUserData, newUser]);
        setAddingNewUser((currentState) => !currentState);
    };

    const checkIfUserAlreadyAdded = (user: UserInformation) => {
        toLog(user, 'checkIfUserAlreadyAdded', 'UserAdder');
        const userExists = tiedUserData.find((element) => {
            if (user.username !== undefined) {
                return user.username === element.username;
            }
            if (user.email !== undefined) {
                return user.email === element.email;
            }
            throw new Error('checkIfUserAlreadyAdded has user without username or email');
        });
        return userExists !== undefined;
    };

    const handleCancel = () => {
        setUsernameInput('');
        setEmailInput('');
        setErrorMessage('');
        setAddingNewUser((currentState) => !currentState);
    };

    const renderAddNewUser = () => {
        return (
            <>
                <View style={UserAdderStyles.addUserContainer}>
                    <Text style={GlobalStyles.subHeader}>Enter Information For Users To Add...</Text>
                    <TextInput
                        style={[UserAdderStyles.input, usernameInputFocused ? UserAdderStyles.inputFocused : null]}
                        placeholder="Enter Username..."
                        placeholderTextColor="#999"
                        value={usernameInput}
                        onChangeText={setUsernameInput}
                        onFocus={() => setUsernameInputFocused(true)}
                        onBlur={() => setUsernameInputFocused(false)}
                    />
                    <Text style={GlobalStyles.subHeader}>Or</Text>
                    <TextInput
                        style={[UserAdderStyles.input, emailInputFocused ? UserAdderStyles.inputFocused : null]}
                        placeholder="Enter Email ..."
                        placeholderTextColor="#999"
                        value={emailInput}
                        onChangeText={setEmailInput}
                        onFocus={() => setEmailInputFocused(true)}
                        onBlur={() => setEmailInputFocused(false)}
                    />
                    <Text style={GlobalStyles.subHeader}>The Following Are Optional</Text>
                    <TextInput
                        style={[UserAdderStyles.input, emailInputFocused ? UserAdderStyles.inputFocused : null]}
                        placeholder="Enter User's First Name ..."
                        placeholderTextColor="#999"
                        value={firstNameInput}
                        onChangeText={setFirstNameInput}
                        onFocus={() => setFirstNameInputFocused(true)}
                        onBlur={() => setFirstNameInputFocused(false)}
                    />
                    <TextInput
                        style={[UserAdderStyles.input, emailInputFocused ? UserAdderStyles.inputFocused : null]}
                        placeholder="Enter User's Last Name ..."
                        placeholderTextColor="#999"
                        value={lastNameInput}
                        onChangeText={setLastNameInput}
                        onFocus={() => setLastNameInputFocused(true)}
                        onBlur={() => setLastNameInputFocused(false)}
                    />
                    <Text style={GlobalStyles.errorMessage}>{errorMessage}</Text>
                </View>

                <View style={UserAdderStyles.buttonContainerHorizontal}>
                    <TouchableOpacity
                        onPress={() => handleCancel()}
                        style={[GlobalStyles.buttonMain, GlobalStyles.buttonMainHorizontal]}
                    >
                        <Text style={GlobalStyles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleConfirmButton()}
                        style={[GlobalStyles.buttonMain, GlobalStyles.buttonMainHorizontal]}
                    >
                        <Text style={GlobalStyles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    };

    return (
        <View style={[ComponentGlobalStyles.container, UserAdderStyles.container]}>
            {addingNewUser ? renderAddNewUser() : renderFlatList()}
        </View>
    );
};
export default UserAdder;
