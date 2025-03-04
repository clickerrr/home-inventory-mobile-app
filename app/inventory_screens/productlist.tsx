import GlobalStyles from '@/styles/GlobalStyles';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import productSampleData from '@/sampleData/ProductSampleData';
import { Product } from '@/types/Product';
import InventoryProductStyles from '@/styles/InventoryProductStyles';
import { router } from 'expo-router';
const ProductList = () => {
    const [productData, setProductData] = useState<Product[]>([]);
    useEffect(() => {
        loadData();
    }, []);
    const loadData = () => {
        loadSampleData();
    };

    const loadSampleData = () => {
        const allEntries = Object.entries(productSampleData);
        const allProducts = allEntries.map(([_, products]) => {
            return products[0];
        });

        console.log(allProducts);
        setProductData(allProducts);
    };

    return (
        <View style={InventoryProductStyles.container}>
            <View style={InventoryProductStyles.content}>
                <Text
                    style={[
                        GlobalStyles.subHeader,
                        InventoryProductStyles.subHeader,
                    ]}
                >
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
                            <Text style={GlobalStyles.buttonText}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.upca}
                />
            </View>
        </View>
    );
};
export default ProductList;
