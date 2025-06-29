import productSampleData from '@/sampleData/ProductSampleData';
import GlobalStyles from '@/styles/GlobalStyles';
import ProductAdderStyles from '@/styles/ProductAdderStyles';
import { Product } from '@/types/Product';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CameraView } from 'expo-camera';
import CameraStyles from '@/styles/CameraStyles';
import axios from 'axios';

interface ProductAdderProps {
    upca: string;
    onSubmit: (newProduct: Product) => void;
}

const dropdownOptions = [
    { title: 'Jar', id: 0 },
    { title: 'Bag', id: 1 },
    { title: 'Box', id: 2 },
    { title: 'Can', id: 3 },
    { title: 'Other', id: 4 },
];
const ProductAdder = ({ upca, onSubmit }: ProductAdderProps) => {
    const [productText, setProductText] = useState<string>('');
    const [scanningNewProduct, setScanningNewProduct] = useState<boolean>(false);
    const [productTextFocused, setProductTextFocused] = useState<boolean>(false);
    const [containerType, setContainerType] = useState({
        title: 'None',
        id: -1,
    });
    const [productUpca, setProductUpca] = useState<string>(upca);

    if (scanningNewProduct) {
        return (
            <CameraView
                style={CameraStyles.camera}
                facing={'back'}
                barcodeScannerSettings={{
                    barcodeTypes: ['upc_a'],
                }}
                autofocus={'off'}
                onBarcodeScanned={(data) => {
                    console.log('data.data: ', data.data);
                    setProductUpca(data.data);
                    setScanningNewProduct(false);
                }}
            ></CameraView>
        );
    }

    const remoteSubmitData = (productToSend: Product) => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        const newObject = {
            upca: '773160122420',
            title: 'Tasty Apple',
            containerType: 'BOX',
            nutritionalInformation: {},
        };
        axios.post(`${baseUrl}/products`, productToSend);
    };

    return (
        <View style={ProductAdderStyles.content}>
            {productUpca === undefined ? (
                <View style={GlobalStyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setScanningNewProduct(true);
                        }}
                        style={GlobalStyles.buttonMain}
                    >
                        <Text style={GlobalStyles.buttonText}>Scan Item to Add UPC</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={ProductAdderStyles.container}>
                    <Text>{`Product UPC: ${productUpca}`}</Text>
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
                <Text style={[ProductAdderStyles.label]}>Product Container Type</Text>
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
                            upca: productUpca,
                            title: productText,
                            containerType: containerType.title.toUpperCase(),
                            nutritionalInformation: {},
                            loggedItems: [],
                        };
                        productSampleData[upca] = newProduct;
                        remoteSubmitData(newProduct);
                        onSubmit(newProduct);
                    }}
                    disabled={productUpca === undefined || productText === null || containerType.title === 'None'}
                    style={[
                        GlobalStyles.buttonMain,
                        productUpca === undefined || productText.trim().length === 0 || containerType.title === 'None'
                            ? GlobalStyles.buttonMainDisabled
                            : '',
                    ]}
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
