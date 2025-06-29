import GlobalStyles from '@/styles/GlobalStyles';
import { Product } from '@/types/Product';
import { useLocalSearchParams } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import logo from '@/assets/images/temp_product_image.jpg';
import ProductPageStyles from '@/styles/ProductPageStyles';
import axios from 'axios';
import ProductEditForm from '@/components/ProductEditForm';
import LoadingSpinner from '@/components/LoadingSpinner';

const IndividualProductPage = () => {
    const { productupca, product } = useLocalSearchParams();
    const [productDetails, setProductDetails] = useState<Product | undefined>(undefined);
    const [productContainer, setProductContainer] = useState<string>('');
    const [productTitle, setProductTitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    useEffect(() => {
        setIsLoading(true);
        console.log(productupca);
        console.log('CURRENT PRODUCT', product);
        if (product === undefined) return;
        const parsedProduct: Product = JSON.parse(product);
        console.log('Product: ', product);
        fetchFullProductDetails(parsedProduct.upca);
    }, [productupca, product]);

    const fetchFullProductDetails = (upca: string) => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

        console.log('passed upca: ', upca);
        axios
            .get(`${baseUrl}/products/${upca}`)
            .then((response) => {
                const productData: Product = response.data;
                console.log(productData);
                setProductDetails(productData);
                setProductTitle(productData.title);
                setProductContainer(productData.containerType);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.status == 404) {
                    console.error('Product UPCA is invalid');
                }
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return <LoadingSpinner textToDisplay="Loading Products..." color={null} />;
    }

    const remoteUpdateProduct = (updatedProduct) => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        console.log('remote updating product', updatedProduct);
        axios.put(`${baseUrl}/products/${updatedProduct.upca}`, updatedProduct);
    };

    return (
        <View style={GlobalStyles.container}>
            <View style={ProductPageStyles.content}>
                <View style={ProductPageStyles.topContainer}>
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <AntDesign size={32} name="edit" color={'black'} />
                    </TouchableOpacity>
                </View>
                <Image style={ProductPageStyles.productImage} source={logo} />
                {isEditing ? (
                    <>
                        <ProductEditForm
                            productTitle={productTitle}
                            containerType={productContainer}
                            onSubmit={(newTitle, newContainerType) => {
                                setProductTitle(newTitle);
                                setProductContainer(newContainerType);
                                setIsEditing(false);
                                productDetails.title = newTitle;
                                productDetails.containerType = newContainerType;
                                remoteUpdateProduct(productDetails);
                            }}
                            onCancel={() => {
                                setIsEditing(false);
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Text style={GlobalStyles.headerText}>{productTitle}</Text>
                        <Text style={GlobalStyles.subHeader}>UPCA</Text>
                        <Text style={GlobalStyles.text}>{productDetails?.upca}</Text>
                        <Text style={GlobalStyles.subHeader}>Container Type</Text>
                        <Text>{productContainer}</Text>
                    </>
                )}
            </View>
        </View>
    );
};
export default IndividualProductPage;
