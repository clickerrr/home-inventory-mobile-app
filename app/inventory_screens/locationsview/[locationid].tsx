import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Location } from '@/types/Location';
import sampleLoggedItems from '@/sampleData/SampleLoggedItems';
import { LoggedItem } from '@/types/LoggedItem';
import GlobalStyles from '@/styles/GlobalStyles';
import InventoryStyles from '@/styles/InventoryStyles';
import productSampleData from '@/sampleData/ProductSampleData';
import { Product } from '@/types/Product';
import tempProductImage from '@/assets/images/temp_product_image.jpg';
import axios from 'axios';

const IndividualRoomPage = () => {
    const { locationId, location } = useLocalSearchParams();
    const [locationDetails, setLocationDetails] = useState<Location | undefined>(undefined);
    const [itemsInLocation, setItemsInLocation] = useState<LoggedItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    };

    useEffect(() => {
        if (location === undefined) return;
        const parsedLocation: Location = JSON.parse(location);

        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        axios.get(`${baseUrl}/locations/${parsedLocation.id}/loggedItems`).then((response) => {
            console.log('response.data', response.data);

            setItemsInLocation(response.data);
            setLocationDetails(parsedLocation);
            setIsLoading(false);
        });
    }, [locationId, location]);
    if (isLoading) {
        return <></>;
    }
    return (
        <View style={GlobalStyles.container}>
            <View style={InventoryStyles.headerContainer}>
                <Text style={[GlobalStyles.headerText, InventoryStyles.headerText]}>{locationDetails?.title}</Text>
            </View>
            <FlatList
                ListEmptyComponent={
                    <View style={GlobalStyles.container}>
                        <Text style={GlobalStyles.subHeader}>No items in this location</Text>
                    </View>
                }
                style={InventoryStyles.list}
                data={itemsInLocation}
                renderItem={({ item }) => {
                    const productData: Product = item.product;
                    console.log('item', item);
                    console.log('productData', productData);
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                router.navigate({
                                    pathname: `/inventory_screens/productsview/${productData.upca}`,
                                    params: {
                                        product: JSON.stringify(productData),
                                    },
                                });
                            }}
                            style={[InventoryStyles.button, InventoryStyles.locationDetailsButton]}
                        >
                            <View style={InventoryStyles.locationDetailsButtonInternal}>
                                {productData !== undefined ? (
                                    <>
                                        <View style={InventoryStyles.productIconContainer}>
                                            <Image style={InventoryStyles.productIcon} source={tempProductImage} />
                                        </View>
                                        <View style={InventoryStyles.loggedItemDetailsContainer}>
                                            <Text
                                                style={[
                                                    InventoryStyles.buttonText,

                                                    InventoryStyles.locationDetailsButtonTitle,
                                                ]}
                                            >
                                                {productData.title}
                                            </Text>
                                            <View style={InventoryStyles.loggedItemDetailsSection}>
                                                <Text
                                                    style={[
                                                        InventoryStyles.locationDetailsButtonSubtitle,
                                                        InventoryStyles.buttonText,
                                                    ]}
                                                >
                                                    Date Logged
                                                </Text>
                                                <Text style={InventoryStyles.buttonText}>
                                                    {formatDate(new Date(item.dateLogged))}
                                                </Text>
                                            </View>
                                            <View style={InventoryStyles.loggedItemDetailsSection}>
                                                <Text
                                                    style={[
                                                        InventoryStyles.locationDetailsButtonSubtitle,
                                                        InventoryStyles.buttonText,
                                                    ]}
                                                >
                                                    Expiration Date
                                                </Text>
                                                <Text style={InventoryStyles.buttonText}>
                                                    {formatDate(new Date(item.expirationDate))}
                                                </Text>
                                            </View>
                                        </View>
                                    </>
                                ) : (
                                    <Text style={InventoryStyles.buttonText}>{item.product}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};
export default IndividualRoomPage;
