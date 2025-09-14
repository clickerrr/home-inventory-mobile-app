import LoadingSpinner from '@/components/LoadingSpinner';
import LoggedItemElement from '@/components/LoggedItemElement';
import LoggedItemFolder from '@/components/LoggedItemFolder';
import GlobalStyles from '@/styles/GlobalStyles';
import InventoryStyles from '@/styles/InventoryStyles';
import InventoryViewStyles from '@/styles/views/InventoryViewStyles';
import { Inventory } from '@/types/Inventory';
import { LoggedItem } from '@/types/LoggedItem';
import { Product } from '@/types/Product';
import { toLog } from '@/utils/ConsoleLog';
import { getRequest } from '@/utils/RequestHandler';
import { sortObjectsById } from '@/utils/SortObjects';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

const InventoryView = () => {
    const [currentInventory, setCurrentInventory] = useState<Inventory | null>(null);
    const [productCountMap, setProductCountMap] = useState<Map | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loggedItemsList, setLoggedItemsList] = useState<LoggedItem[]>([]);

    const { inventory } = useLocalSearchParams();

    useFocusEffect(
        useCallback(() => {
            loadLoggedItems(currentInventory);
        }, [currentInventory])
    );

    useEffect(() => {
        if (inventory === null || inventory === undefined) return;

        const parsedInventory: Inventory = JSON.parse(inventory);

        setCurrentInventory(parsedInventory);
        toLog(`parsedInventory logged items: ${parsedInventory.loggedItems}`);
        loadLoggedItems(parsedInventory);

        setIsLoading(false);
    }, [inventory]);

    const loadLoggedItems = (inventory: Inventory) => {
        if (inventory === null) return;

        toLog(`${JSON.stringify(inventory)}`);
        toLog(inventory);
        toLog(`${inventory.id}`);

        getRequest(`newLoggedItems?inventoryId=${inventory.id}`).then((result) => {
            toLog(`result new logged items ${JSON.stringify(result)}`);
            setIsLoading(false);

            const countMap = new Map();
            const sortedData = sortObjectsById(result);
            sortedData.forEach((element: LoggedItem) => {
                const product: Product = element.product;

                if (countMap.get(product.upca) !== undefined) {
                    countMap.set(product.upca, [...countMap.get(product.upca), element]);
                } else {
                    countMap.set(product.upca, [element]);
                }
            });
            setProductCountMap(countMap);
            const itemsArray = [...countMap.values()];
            setLoggedItemsList(itemsArray);
        });
    };

    const remoteDeleteItem = (item) => {
        deleteRequest(`loggedItem/${item.id}`).then(() => {
            loadData();
        });
    };

    const renderItems = ({ item }) => {
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
    };

    const renderEmptyComponent = () => {
        return (
            <View style={GlobalStyles.container}>
                <Text style={GlobalStyles.subHeader}>No Logged Items Yet</Text>
            </View>
        );
    };

    return (
        <View style={GlobalStyles.main}>
            <View style={InventoryStyles.headerContent}>
                <Text style={GlobalStyles.subHeader}>
                    {currentInventory !== null && currentInventory !== undefined
                        ? currentInventory.title
                        : 'No Inventory Title'}
                </Text>
            </View>
            <View style={InventoryViewStyles.content}>
                {isLoading ? (
                    <LoadingSpinner textToDisplay={`Loading...`} textSize={null} color={null} />
                ) : (
                    <FlatList style={InventoryStyles.list} data={loggedItemsList} renderItem={renderItems} />
                )}
            </View>
            <View style={InventoryStyles.footerContent}></View>
        </View>
    );
};
export default InventoryView;
