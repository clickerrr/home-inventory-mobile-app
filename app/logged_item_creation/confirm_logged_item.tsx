import GlobalStyles from '@/styles/GlobalStyles';
import { LoggedItem } from '@/types/LoggedItem';
import { Location } from '@/types/Location';
import { Product } from '@/types/Product';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import ConfirmLoggedItemStyles from '@/styles/ConfirmLoggedItemStyles';

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
            <TouchableHighlight
                style={GlobalStyles.buttonMain}
                onPress={() => {
                    router.navigate({
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
            </TouchableHighlight>
        </View>
    );
};
export default ConfirmItemPage;
