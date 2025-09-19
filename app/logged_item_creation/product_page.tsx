import { router, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProductPageStyles from '@/styles/ProductPageStyles';
import GlobalStyles from '@/styles/GlobalStyles';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Product } from '@/types/Product';
import InputSpinner from 'react-native-input-spinner';
import { TouchableOpacity } from 'react-native';
import productSampleData from '@/sampleData/ProductSampleData';
import { Checkbox } from 'expo-checkbox';

const ProductPage = () => {
    const addWeeksToDate = (dateObj: Date, numberOfWeeks: number) => {
        const newDateObj = new Date(dateObj);
        newDateObj.setDate(dateObj.getDate() + numberOfWeeks * 7);
        return newDateObj;
    };

    const [product, setProduct] = useState<Product | null>(null);
    const [isExpirationCheckboxChecked, setIsExpirationCheckBoxChecked] = useState<boolean>(false);
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [expirationDate, setExpirationDate] = useState<Date>(addWeeksToDate(new Date(), 1));
    const [isDatePickerOpen, setIsDatePickerOpen] = useState<false>(false);

    const { barcodeId, title, description, other } = useLocalSearchParams();
    useEffect(() => {
        if (barcodeId === undefined) {
            return;
        }

        let newProduct: Product = {
            upca: barcodeId ? barcodeId : '-1',
            title: title ? title : 'Testing',
            containerType: description ? description : 'OTHER',
            nutritionalInformation: null,
            loggedItems: [],
        };

        const existingProduct = productSampleData[barcodeId];
        console.log('existingProduct', existingProduct);
        if (existingProduct !== undefined) {
            newProduct = { ...existingProduct };
        }
        setProduct(newProduct);

        console.log('Setting product', newProduct);
    }, [barcodeId]);

    const handleCheckEvent = (value: boolean) => {
        setIsExpirationCheckBoxChecked(value);
    };

    const handleSelectDate = (event, selectedDate) => {
        setExpirationDate(selectedDate);
    };

    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <View style={GlobalStyles.headerContent}></View>
                <View style={[GlobalStyles.content]}>
                    <Text style={[GlobalStyles.subHeader, ProductPageStyles.subHeader]}>Product Title</Text>
                    <Text style={GlobalStyles.text}>{product ? product.title : ''}</Text>
                    <Text style={[GlobalStyles.subHeader, ProductPageStyles.subHeader]}>Product Description</Text>
                    <Text style={GlobalStyles.text}>{product ? product.containerType : ''}</Text>
                    <Text style={[GlobalStyles.subHeader, ProductPageStyles.subHeader]}>Product Amount</Text>
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
                    <View style={ProductPageStyles.expirationCheckContainer}>
                        <Checkbox
                            value={isExpirationCheckboxChecked}
                            onValueChange={handleCheckEvent}
                            color={isExpirationCheckboxChecked ? 'green' : undefined}
                        />
                        <Text style={ProductPageStyles.expirationCheckText}>Should this product expire?</Text>
                    </View>
                    <View style={ProductPageStyles.expirationInputContainer}>
                        {isExpirationCheckboxChecked ? (
                            <>
                                <View style={ProductPageStyles.expirationDatePickerContainer}>
                                    <Text style={[GlobalStyles.subHeader, ProductPageStyles.subHeader]}>
                                        Expiration Date
                                    </Text>
                                    <DateTimePicker
                                        themeVariant={'light'}
                                        value={expirationDate}
                                        minimumDate={new Date()}
                                        mode={'date'}
                                        display={'compact'}
                                        onChange={handleSelectDate}
                                    />
                                </View>
                            </>
                        ) : (
                            <></>
                        )}
                    </View>
                </View>

                <View style={[GlobalStyles.footerContent, ProductPageStyles.buttonContainer]}>
                    <TouchableOpacity
                        style={GlobalStyles.buttonMain}
                        onPress={() => {
                            console.log('current quantity', currentQuantity);
                            router.push({
                                pathname: '/logged_item_creation/room_page',
                                params: {
                                    associatedProduct: JSON.stringify(product),
                                    itemExpirationDate: isExpirationCheckboxChecked
                                        ? expirationDate.toISOString()
                                        : null,
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
                            router.dismissAll();
                        }}
                    >
                        <Text style={GlobalStyles.buttonCancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default ProductPage;
