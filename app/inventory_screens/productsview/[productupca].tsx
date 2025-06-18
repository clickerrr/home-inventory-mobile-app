import GlobalStyles from '@/styles/GlobalStyles';
import { Product } from '@/types/Product';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import logo from '@/assets/images/temp_product_image.jpg';
import ProductPageStyles from '@/styles/ProductPageStyles';

const IndividualProductPage = () => {
    const { productupca, product } = useLocalSearchParams();
    const [productDetails, setProductDetails] = useState<Product | undefined>(
        undefined
    );
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log(productupca);
        console.log('CURRENT PRODUCT', product);
        if (product === undefined) return;
        const parsedProduct: Product = JSON.parse(product);
        setProductDetails(parsedProduct);
        setIsLoading(false);
        console.log('Product: ', product);
    }, [productupca, product]);
    if (isLoading) {
        return <></>;
    }
    return (
        <View style={GlobalStyles.container}>
            <Image style={ProductPageStyles.productImage} source={logo} />
            <View style={ProductPageStyles.content}>
                <Text style={GlobalStyles.headerText}>
                    {productDetails?.title}
                </Text>
                <Text style={GlobalStyles.subHeader}>UPCA</Text>
                <Text style={GlobalStyles.text}>{productDetails?.upca}</Text>
                <Text style={GlobalStyles.subHeader}>Container Type</Text>
                <Text>{productDetails?.containerType}</Text>
            </View>
        </View>
    );
};
export default IndividualProductPage;
