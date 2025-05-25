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

const ConfirmItemPage = () => {
    const { loggedItem, associatedProduct, location, quantity } =
        useLocalSearchParams();
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
        console.log(associatedProduct, location, loggedItem);
        const associatedProductObj: Product = JSON.parse(associatedProduct);
        const locationObj: Location = JSON.parse(location);
        const loggedItemObj: LoggedItem = JSON.parse(loggedItem);
        console.log(loggedItemObj);
        return (
            <View>
                <View style={ConfirmLoggedItemStyles.container}>
                    <Text
                        style={[
                            GlobalStyles.subHeader,
                            ConfirmLoggedItemStyles.largeText,
                        ]}
                    >
                        Product Title
                    </Text>
                    <Text style={GlobalStyles.text}>
                        {associatedProductObj.title}
                    </Text>
                    <Text
                        style={[
                            GlobalStyles.subHeader,
                            ConfirmLoggedItemStyles.largeText,
                        ]}
                    >
                        Product Container
                    </Text>
                    <Text style={GlobalStyles.text}>
                        {associatedProductObj.containerType}
                    </Text>
                    <Text
                        style={[
                            GlobalStyles.subHeader,
                            ConfirmLoggedItemStyles.largeText,
                        ]}
                    >
                        Product Quantity
                    </Text>
                    <Text style={GlobalStyles.text}>{quantity}</Text>
                </View>
                <View style={ConfirmLoggedItemStyles.container}>
                    <Text
                        style={[
                            GlobalStyles.subHeader,
                            ConfirmLoggedItemStyles.largeText,
                        ]}
                    >
                        Logged Date
                    </Text>
                    <Text style={GlobalStyles.text}>
                        {formatDate(new Date(loggedItemObj.dateLogged))}
                    </Text>
                    <Text
                        style={[
                            GlobalStyles.subHeader,
                            ConfirmLoggedItemStyles.largeText,
                        ]}
                    >
                        Expiration Date
                    </Text>
                    <Text style={GlobalStyles.text}>
                        {formatDate(new Date(loggedItemObj.expirationDate))}
                    </Text>
                    <Text
                        style={[
                            GlobalStyles.subHeader,
                            ConfirmLoggedItemStyles.largeText,
                        ]}
                    >
                        Consume By Date
                    </Text>
                    <Text style={GlobalStyles.text}>
                        {formatDate(new Date(loggedItemObj.consumeByDate))}
                    </Text>
                </View>
            </View>
        );
    };
    return (
        <View style={GlobalStyles.container}>
            <Text
                style={[
                    GlobalStyles.subHeader,
                    ConfirmLoggedItemStyles.subHeader,
                ]}
            >
                Make sure everything is correct
            </Text>
            <View style={ConfirmLoggedItemStyles.contentContainer}>
                {renderLoggedItem()}
            </View>
            <View style={ConfirmLoggedItemStyles.buttonContainer}>
                <View style={ConfirmLoggedItemStyles.horizontalButtonContainer}>
                    <TouchableOpacity
                        style={[
                            GlobalStyles.buttonCancel,
                            GlobalStyles.buttonMainHorizontal,
                        ]}
                        onPress={() => {
                            router.replace('/');
                        }}
                    >
                        <Text style={GlobalStyles.buttonCancelText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            GlobalStyles.buttonMain,
                            GlobalStyles.buttonMainHorizontal,
                        ]}
                        onPress={() => {
                            let idCounter = 0;
                            for (let i = 0; i < Number(quantity); i++) {
                                const parsedLoggedItem: LoggedItem =
                                    JSON.parse(loggedItem);
                                const newLoggedItem: LoggedItem = {
                                    id: parsedLoggedItem.id + idCounter,
                                    dateLogged: parsedLoggedItem.dateLogged,
                                    expirationDate:
                                        parsedLoggedItem.expirationDate,
                                    consumeByDate:
                                        parsedLoggedItem.consumeByDate,
                                    product: parsedLoggedItem.product,
                                    location: parsedLoggedItem.location,
                                    inventory: parsedLoggedItem.inventory,
                                };
                                sampleLoggedItems.push(newLoggedItem);
                                const locationObj: Location =
                                    JSON.parse(location);
                                const storedLocation = locations.find(
                                    (element: Location) => {
                                        return element.id === locationObj.id;
                                    }
                                );
                                if (storedLocation === undefined) {
                                    return;
                                }
                                storedLocation.loggedItems.push(
                                    newLoggedItem.id
                                );
                                idCounter = idCounter + 1;
                            }
                            router.replace({
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
