import productSampleData from '@/sampleData/ProductSampleData';
import GlobalStyles from '@/styles/GlobalStyles';
import ProductAdderStyles from '@/styles/ProductAdderStyles';
import { Product } from '@/types/Product';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface ProductAdderProps {
    upca: string;
    onNewUpca: () => void;
}

const dropdownOptions = [
    { title: 'Jar', id: 0 },
    { title: 'Bag', id: 1 },
    { title: 'Box', id: 2 },
    { title: 'Can', id: 3 },
    { title: 'Other', id: 4 },
];
const ProductAdder = ({ upca, onNewUpca }: ProductAdderProps) => {
    const [productText, setProductText] = useState<string>('');
    const [productTextFocused, setProductTextFocused] =
        useState<boolean>(false);
    const [containerType, setContainerType] = useState({
        title: 'None',
        id: -1,
    });
    const [productUpca, setProductUpca] = useState(upca);

    useEffect(() => {
        if (upca === undefined) {
        }
    }, [upca]);
    return (
        <View style={ProductAdderStyles.content}>
            {productUpca === undefined ? (
                <View style={GlobalStyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            onNewUpca();
                        }}
                        style={GlobalStyles.buttonMain}
                    >
                        <Text style={GlobalStyles.buttonText}>
                            Scan Item to Add UPC
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={ProductAdderStyles.container}>
                    <Text>Product UPC: {upca}</Text>
                </View>
            )}

            <View style={ProductAdderStyles.textInputContainer}>
                <Text style={[ProductAdderStyles.label]}>Product Title</Text>
                <TextInput
                    style={[ProductAdderStyles.input]}
                    placeholder="Enter product name..."
                    placeholderTextColor="#999"
                    value={productText}
                    onChangeText={setProductText}
                    onFocus={() => setProductTextFocused(true)}
                    onBlur={() => setProductTextFocused(false)}
                />
            </View>
            <View style={ProductAdderStyles.container}>
                <Text style={[ProductAdderStyles.label]}>
                    Product Container Type
                </Text>
                <Dropdown
                    style={ProductAdderStyles.dropdown}
                    data={dropdownOptions}
                    labelField="title"
                    valueField="id"
                    value={containerType}
                    onChange={(value) => {
                        console.log(value);
                        setContainerType(value);
                    }}
                />
            </View>
            <View style={GlobalStyles.buttonContainer}>
                <TouchableHighlight
                    onPress={() => {
                        const newProduct: Product = {
                            upca: upca,
                            title: productText,
                            containerType: containerType.title,
                            nutritionalInformation: -1,
                            loggedItems: [],
                        };

                        productSampleData[upca] = newProduct;
                        router.back();
                    }}
                    style={GlobalStyles.buttonMain}
                >
                    <Text style={GlobalStyles.buttonText}>Submit</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        router.back();
                    }}
                    style={GlobalStyles.buttonMain}
                >
                    <Text style={GlobalStyles.buttonText}>Cancel</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};
export default ProductAdder;
