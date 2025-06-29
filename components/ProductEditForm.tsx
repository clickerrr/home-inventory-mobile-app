import React, { useEffect, useState } from 'react';

import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import ProductAdderStyles from '@/styles/ProductAdderStyles';
import ContainerTypeDropdown from '@/components/ContainerTypeDropdown';
import GlobalStyles from '@/styles/GlobalStyles';
import ProductEditFormStyles from '@/styles/ProductEditFormStyles';
interface ProductEditFormProps {
    productTitle: string;
    containerType: string;
    onSubmit: (newTitle: string, newContainerType: string) => void;
    onCancel: () => void;
}
const ProductEditForm = ({ productTitle, containerType, onSubmit, onCancel }: ProductEditFormProps) => {
    useEffect(() => {
        setProductTitleText(productTitle);
        setProductContainerType(containerType);
    }, []);
    const [productTitleText, setProductTitleText] = useState<string>('');
    const [productTitleTextFocused, setProductTitleTextFocused] = useState<boolean>(false);
    const [productContainerType, setProductContainerType] = useState<string>('');
    return (
        <View style={ProductEditFormStyles.container}>
            <TextInput
                style={[ProductAdderStyles.input, ProductEditFormStyles.item]}
                placeholder="Enter product name..."
                placeholderTextColor="#999"
                value={productTitleText}
                onChangeText={setProductTitleText}
                onFocus={() => setProductTitleTextFocused(true)}
                onBlur={() => setProductTitleTextFocused(false)}
            />
            <ContainerTypeDropdown
                containerStyle={ProductEditFormStyles.item}
                containerType={productContainerType}
                setContainerType={setProductContainerType}
            />
            <TouchableOpacity
                style={[GlobalStyles.buttonMain, ProductEditFormStyles.item]}
                onPress={() => onSubmit(productTitleText, productContainerType)}
            >
                <Text style={GlobalStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[GlobalStyles.buttonMain, ProductEditFormStyles.item]} onPress={onCancel}>
                <Text style={GlobalStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};
export default ProductEditForm;
