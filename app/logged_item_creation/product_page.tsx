import { router, useLocalSearchParams } from 'expo-router';
import ProductPageStyles from '@/styles/ProductPageStyles';
import GlobalStyles from '@/styles/GlobalStyles';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Product } from '@/types/Product';
import InputSpinner from 'react-native-input-spinner';
import { TouchableOpacity } from 'react-native';
import productSampleData from '@/sampleData/ProductSampleData';

const ProductPage = () => {
    const [product, setProduct] = useState<Product>();
    const { barcodeId, other } = useLocalSearchParams();
    useEffect(() => {
        if (barcodeId === undefined) {
            return;
        }
        let newProduct: Product = {
            upca: barcodeId ? barcodeId : '-1',
            title: 'Testing',
            containerType: 'OTHER',
            nutritionalInformation: null,
            loggedItems: [],
        };

        const existingProduct = productSampleData[barcodeId];
        console.log('existingProduct', existingProduct);
        if (existingProduct !== undefined) {
            newProduct = { ...existingProduct[0] };
        }
        setProduct(newProduct);

        console.log('Setting product', newProduct);
    }, [barcodeId]);
    const [currentQuantity, setCurrentQuantity] = useState(1);
    return (
        <View style={ProductPageStyles.main}>
            <View
                style={[ProductPageStyles.container, ProductPageStyles.content]}
            >
                <Text
                    style={[
                        GlobalStyles.subHeader,
                        ProductPageStyles.subHeader,
                    ]}
                >
                    Product Title
                </Text>
                <Text style={GlobalStyles.text}>
                    {product ? product.title : ''}
                </Text>
                <Text
                    style={[
                        GlobalStyles.subHeader,
                        ProductPageStyles.subHeader,
                    ]}
                >
                    Product Description
                </Text>
                <Text style={GlobalStyles.text}>
                    {product ? product.containerType : ''}
                </Text>
                <Text
                    style={[
                        GlobalStyles.subHeader,
                        ProductPageStyles.subHeader,
                    ]}
                >
                    Product Amount
                </Text>
                <InputSpinner
                    max={10}
                    min={1}
                    step={1}
                    style={ProductPageStyles.spinnerButton}
                    skin={'square'}
                    colorMax={'#f04048'}
                    colorMin={'#40c5f4'}
                    value={currentQuantity}
                    onChange={(num: number) => {
                        setCurrentQuantity(num);
                    }}
                />
            </View>
            <View
                style={[
                    ProductPageStyles.container,
                    ProductPageStyles.buttonContainer,
                ]}
            >
                <TouchableOpacity
                    style={GlobalStyles.buttonMain}
                    onPress={() => {
                        console.log('current quantity', currentQuantity);
                        router.navigate({
                            pathname: '/logged_item_creation/room_page',
                            params: {
                                associatedProduct: JSON.stringify(product),
                                quantity: currentQuantity,
                            },
                        });
                    }}
                >
                    <Text style={GlobalStyles.buttonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.buttonCancel}
                    onPress={() => {
                        router.navigate('/');
                    }}
                >
                    <Text style={GlobalStyles.buttonCancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default ProductPage;
