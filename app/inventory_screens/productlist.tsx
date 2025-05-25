import GlobalStyles from '@/styles/GlobalStyles';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import productSampleData from '@/sampleData/ProductSampleData';
import { Product } from '@/types/Product';
import InventoryProductStyles from '@/styles/InventoryProductStyles';
import { router } from 'expo-router';
import { ZodProduct } from '@/types/ZodProduct';
const ProductList = () => {
    const [productData, setProductData] = useState<Product[]>([]);
    useEffect(() => {
        loadData();
    }, []);
    const loadData = () => {
        fetch('http://192.168.1.11:8080/products')
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                console.log('JSON RESPONSE', result);
                const productList: any[] = [];
                result.forEach((element) => {
                    return productList.push(ZodProduct.parse(element));
                });
                console.log(productList);
            })
            .catch((error) => {
                console.error(error);
            });
        //loadSampleData();
    };

    const loadSampleData = () => {
        const allEntries = Object.entries(productSampleData);
        const allProducts = allEntries.map(([_, products]) => {
            return products;
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
