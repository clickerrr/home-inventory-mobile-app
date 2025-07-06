import GlobalStyles from '@/styles/GlobalStyles';
import { LoggedItem } from '@/types/LoggedItem';
import { Location } from '@/types/Location';
import { Product } from '@/types/Product';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ConfirmLoggedItemStyles from '@/styles/ConfirmLoggedItemStyles';
import sampleLoggedItems from '@/sampleData/SampleLoggedItems';
import { locations } from '@/sampleData/RoomSelectorSampleData';
import axios from 'axios';

const ConfirmItemPage = () => {
    const { loggedItem, associatedProduct, location, quantity } = useLocalSearchParams();
    useEffect(() => {
        console.log(loggedItem);
    }, [loggedItem]);
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    };

    const renderLoggedItem = () => {
        const associatedProductObj: Product = JSON.parse(associatedProduct);
        const locationObj: Location = JSON.parse(location);
        const loggedItemObj: LoggedItem = JSON.parse(loggedItem);
        console.log('logged item obj', loggedItemObj);
        return (
            <View>
                <View style={ConfirmLoggedItemStyles.container}>
                    <Text style={[GlobalStyles.subHeader, ConfirmLoggedItemStyles.largeText]}>Product Title</Text>
                    <Text style={GlobalStyles.text}>{associatedProductObj.title}</Text>
                    <Text style={[GlobalStyles.subHeader, ConfirmLoggedItemStyles.largeText]}>Product Container</Text>
                    <Text style={GlobalStyles.text}>{associatedProductObj.containerType}</Text>
                    <Text style={[GlobalStyles.subHeader, ConfirmLoggedItemStyles.largeText]}>Product Quantity</Text>
                    <Text style={GlobalStyles.text}>{quantity}</Text>
                </View>
                <View style={ConfirmLoggedItemStyles.container}>
                    <Text style={[GlobalStyles.subHeader, ConfirmLoggedItemStyles.largeText]}>Logged Date</Text>
                    <Text style={GlobalStyles.text}>{formatDate(new Date(loggedItemObj.dateLogged))}</Text>
                    <Text style={[GlobalStyles.subHeader, ConfirmLoggedItemStyles.largeText]}>Expiration Date</Text>
                    <Text style={GlobalStyles.text}>{formatDate(new Date(loggedItemObj.expirationDate))}</Text>
                    <Text style={[GlobalStyles.subHeader, ConfirmLoggedItemStyles.largeText]}>Consume By Date</Text>
                    <Text style={GlobalStyles.text}>{formatDate(new Date(loggedItemObj.consumeByDate))}</Text>
                </View>
            </View>
        );
    };
    return (
        <View style={GlobalStyles.container}>
            <Text style={[GlobalStyles.subHeader, ConfirmLoggedItemStyles.subHeader]}>
                Make Sure Everything is Correct
            </Text>
            <View style={ConfirmLoggedItemStyles.contentContainer}>{renderLoggedItem()}</View>
            <View style={ConfirmLoggedItemStyles.buttonContainer}>
                <View style={ConfirmLoggedItemStyles.horizontalButtonContainer}>
                    <TouchableOpacity
                        style={[GlobalStyles.buttonCancel, GlobalStyles.buttonMainHorizontal]}
                        onPress={() => {
                            router.dismissTo('/');
                        }}
                    >
                        <Text style={GlobalStyles.buttonCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[GlobalStyles.buttonMain, GlobalStyles.buttonMainHorizontal]}
                        onPress={() => {
                            const parsedLoggedItem: LoggedItem = JSON.parse(loggedItem);
                            console.log('parsedLoggedItem', parsedLoggedItem);
                            const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
                            const newLoggedItem: LoggedItem = {
                                dateLogged: parsedLoggedItem.dateLogged.split('T')[0],
                                expirationDate: parsedLoggedItem.expirationDate.split('T')[0],
                                consumeByDate: parsedLoggedItem.consumeByDate.split('T')[0],
                                product: parsedLoggedItem.product,
                                location: parsedLoggedItem.location,
                                inventory: { id: 1 },
                            };
                            for (let i = 0; i < Number(quantity); i++) {
                                console.log(newLoggedItem.product.upca, newLoggedItem.location.id);
                                axios
                                    .post(
                                        `${baseUrl}/loggedItem?upca=${newLoggedItem.product.upca}&locationId=${newLoggedItem.location.id}&inventoryId=1`,
                                        newLoggedItem
                                    )
                                    .then((response) => {
                                        console.log('logged item response', response);
                                    });
                            }
                            router.dismissTo({
                                pathname: '/',
                                params: {
                                    flashText: `Successfully added`,
                                    quantity: quantity,
                                    loggedItem: loggedItem,
                                },
                            });
                        }}
                    >
                        <Text style={GlobalStyles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
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
export default ConfirmItemPage;
