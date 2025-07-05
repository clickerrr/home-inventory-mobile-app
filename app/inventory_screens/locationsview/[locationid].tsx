import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Location } from '@/types/Location';
import { LoggedItem } from '@/types/LoggedItem';
import GlobalStyles from '@/styles/GlobalStyles';
import InventoryStyles from '@/styles/InventoryStyles';
import axios from 'axios';
import LoggedItemElement from '@/components/LoggedItemElement';
import LoggedItemFolder from '@/components/LoggedItemFolder';
import { sortObjectsById } from '@/utils/SortObjects';

const IndividualRoomPage = () => {
    const { locationId, location } = useLocalSearchParams();
    const [locationDetails, setLocationDetails] = useState<Location | undefined>(undefined);
    const [itemsInLocation, setItemsInLocation] = useState<LoggedItem[][]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [productCountMap, setProductCountMap] = useState(null);

    const loadData = () => {
        const parsedLocation: Location = JSON.parse(location);
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        axios.get(`${baseUrl}/locations/${parsedLocation.id}/loggedItems`).then((response) => {
            console.log('response.data', response.data);

            const countMap = new Map();
            const sortedData = sortObjectsById(response.data);
            sortedData.forEach((element) => {
                const product = element.product;
                console.log('product', product);

                if (countMap.get(product.upca) !== undefined) {
                    console.log('Incrementing');
                    countMap.set(product.upca, [...countMap.get(product.upca), element]);
                } else {
                    console.log('Setting');
                    countMap.set(product.upca, [element]);
                }
            });
            setProductCountMap(countMap);
            const itemsArray = [...countMap.values()];
            setItemsInLocation(itemsArray);
            setLocationDetails(parsedLocation);
            setIsLoading(false);
        });
    };
    useEffect(() => {
        loadData();
    }, [locationId, location]);

    if (isLoading) {
        return <></>;
    }

    const remoteDeleteItem = (item) => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        axios.delete(`${baseUrl}/loggedItem/${item.id}`).then(() => {
            loadData();
        });
    };

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
                    console.log(item);
                    if (item.length > 1) {
                        return (
                            <LoggedItemFolder
                                onDelete={(item) => {
                                    console.log('Deleting item', item);
                                    remoteDeleteItem(item);
                                }}
                                items={item}
                                itemsCount={item.length}
                            />
                        );
                    }
                    return (
                        <LoggedItemElement
                            onDelete={(item) => {
                                console.log('Deleting item', item);
                                remoteDeleteItem(item);
                            }}
                            item={item[0]}
                        />
                    );
                }}
            />
        </View>
    );
};
export default IndividualRoomPage;
