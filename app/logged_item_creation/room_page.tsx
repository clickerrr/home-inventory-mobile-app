import RoomSelector from '@/components/RoomSelector';
import { LoggedItem } from '@/types/LoggedItem';
import { Location } from '@/types/Location';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Product } from '@/types/Product';
import GlobalStyles from '@/styles/GlobalStyles';
import RoomPageStyles from '@/styles/RoomPageStyles';
import sampleLoggedItems from '@/sampleData/SampleLoggedItems';
import InventorySelector from '@/components/InventorySelector';

const RoomPage = () => {
    const { associatedProduct, quantity } = useLocalSearchParams();
    useEffect(() => {
        console.log('associatedProduct');
        console.log(associatedProduct);
        console.log('quantity', quantity);
    }, [associatedProduct, quantity]);

    const addWeeksToDate = (dateObj: Date, numberOfWeeks: number) => {
        const newDateObj = new Date(dateObj);
        newDateObj.setDate(dateObj.getDate() + numberOfWeeks * 7);
        return newDateObj;
    };

    const today = new Date();

    const handleFinishProduct = (location: Location): LoggedItem => {
        const parsedProduct: Product = JSON.parse(associatedProduct);
        console.log('parsedproduct', parsedProduct);
        const newLoggedItem: LoggedItem = {
            id: sampleLoggedItems.length,
            dateLogged: today.toISOString(),
            expirationDate: addWeeksToDate(today, 1).toISOString(),
            consumeByDate: addWeeksToDate(today, 1).toISOString(),
            product: parsedProduct,
            location: location,
            inventory: -1,
        };
        return newLoggedItem;
    };

    return (
        <View style={GlobalStyles.container}>
            <RoomSelector
                handleNext={(location: Location) => {
                    const loggedItem = handleFinishProduct(location);
                    console.log('associatedProduct', associatedProduct);
                    router.push({
                        pathname: '/logged_item_creation/confirm_logged_item',
                        params: {
                            loggedItem: JSON.stringify(loggedItem),
                            associatedProduct: associatedProduct,
                            location: JSON.stringify(location),
                            quantity: quantity,
                        },
                    });
                }}
                handleCancel={() => {
                    router.back();
                }}
                cancelText={'Back'}
            />
        </View>
    );
};

export default RoomPage;
