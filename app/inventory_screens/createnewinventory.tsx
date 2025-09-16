import GlobalStyles from '@/styles/GlobalStyles';
import InventoryStyles from '@/styles/InventoryStyles';
import { postRequest } from '@/utils/RequestHandler';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Inventory } from '@/types/Inventory';
import { House } from '@/types/House';
import { logError, toLog } from '@/utils/ConsoleLog';
import LoadingSpinner from '@/components/LoadingSpinner';

const CreateNewInventory = () => {
    const { house } = useLocalSearchParams();
    const [workingHouse, setWorkingHouse] = useState<House | null>(null);
    const [newInventoryTitle, setNewInventoryTitle] = useState<string>('');
    const [newInventoryTitleFocused, setNewInventoryTitleFocused] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        toLog(`passedHouse: ${house}`);
        setWorkingHouse(JSON.parse(house));
    }, [house]);
    const handleCreateNewInventory = async () => {
        if (workingHouse === null || workingHouse === undefined) {
            Alert.alert('Error', `Error adding new inventory. An associated house was not passed`, [
                {
                    text: 'OK',
                    onPress: () => {
                        router.back();
                    },
                },
            ]);
            return;
        }

        const newInventory: Inventory = {
            title: newInventoryTitle,
            loggedItems: [],
        };

        try {
            setIsLoading(true);

            const inventoryResponse = await postRequest(`inventories?houseId=${workingHouse.id}`, newInventory);
            const createdInventory: Inventory = JSON.parse(inventoryResponse);
            toLog(`${JSON.stringify(inventoryResponse)}`);
            const houseResponse = await postRequest(
                `houses/inventory?houseId=${workingHouse.id}&inventoryId=${createdInventory.id}`,
                {}
            );
            toLog(`${JSON.stringify(houseResponse)}`);
        } catch (error: any) {
            logError(`${error}`, `handleCreateNewInventory`, `createnewinventory`);
        }

        setIsLoading(false);
        router.back();
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <View style={GlobalStyles.main}>
            <Modal visible={isLoading} animationType="fade" transparent={true}>
                <View style={GlobalStyles.modalScreen}>
                    <LoadingSpinner textToDisplay={'Submitting...'} textSize={null} color={null} />
                </View>
            </Modal>
            <View style={InventoryStyles.headerContent}></View>
            <View style={InventoryStyles.content}>
                <TextInput
                    style={[InventoryStyles.textInput]}
                    placeholder="Enter inventory name..."
                    placeholderTextColor="#999"
                    value={newInventoryTitle}
                    onChangeText={setNewInventoryTitle}
                    onFocus={() => setNewInventoryTitleFocused(true)}
                    onBlur={() => setNewInventoryTitleFocused(false)}
                />
            </View>
            <View style={InventoryStyles.footerContent}>
                <TouchableOpacity
                    onPress={() => {
                        handleCreateNewInventory();
                    }}
                    style={GlobalStyles.buttonMain}
                >
                    <Text style={GlobalStyles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        handleCancel();
                    }}
                    style={GlobalStyles.buttonCancel}
                >
                    <Text style={GlobalStyles.buttonCancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default CreateNewInventory;
