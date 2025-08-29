import GlobalStyles from '@/styles/GlobalStyles';
import { useState, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '@/types/Product';
import InventoryProductStyles from '@/styles/InventoryProductStyles';
import { router, useFocusEffect } from 'expo-router';
import axios from 'axios';
import { sortObjectsById } from '@/utils/SortObjects';
import { getRequest } from '@/utils/RequestHandler';

const ProductList = () => {
    const [productData, setProductData] = useState<Product[]>([]);
    const [listRefreshing, setListRefreshing] = useState<boolean>(false);
    const [productCountMap, setProductCountMap] = useState(new Map());

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = () => {
        getRequest('products')
            .then((result) => {
                console.log(result.data);

                const networkedProducts = [];
                result.forEach((element) => {
                    networkedProducts.push(element);
                    if (productCountMap.get(element.upca)) {
                        productCountMap.set(element.upca, element.get(element.upca) + 1);
                    } else {
                        productCountMap.set(element.upca, 0);
                    }
                });
                const sortedProducts = sortObjectsById(networkedProducts);
                setProductData(sortedProducts);
                console.log('Set Networked Products');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={InventoryProductStyles.container}>
            <View style={InventoryProductStyles.content}>
                <Text style={[GlobalStyles.subHeader, InventoryProductStyles.subHeader]}>
                    Tap on a product to view its details
                </Text>
                <FlatList
                    style={InventoryProductStyles.list}
                    data={productData}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={InventoryProductStyles.listButton}
                            onPress={() => {
                                router.navigate({
                                    pathname: `/inventory_screens/productsview/${item.upca}`,
                                    params: { product: JSON.stringify(item) },
                                });
                            }}
                        >
                            <Text style={GlobalStyles.buttonText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.upca}
                    refreshing={listRefreshing}
                    onRefresh={() => {
                        setListRefreshing(true);
                        loadData();
                        setListRefreshing(false);
                    }}
                />
                <View style={GlobalStyles.buttonContainer}>
                    <TouchableOpacity
                        style={GlobalStyles.buttonMain}
                        onPress={() => {
                            router.push('/newproduct/newproductscreen');
                        }}
                    >
                        <Text style={GlobalStyles.buttonText}>New Product</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default ProductList;
