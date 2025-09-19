import GlobalStyles from '@/styles/GlobalStyles';
import InventoryProductStyles from '@/styles/InventoryProductStyles';
import InventoryStyles from '@/styles/InventoryStyles';
import { Product } from '@/types/Product';
import { router } from 'expo-router';
import { TouchableOpacity, Text, View, Image, ActionSheetIOS, Alert } from 'react-native';
import tempProductImage from '@/assets/images/temp_product_image.jpg';
import { LoggedItem } from '@/types/LoggedItem';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import LoggedItemElementStyles from '@/styles/components/LoggedItemElementStyles';

interface ProductListElementProps {
    item: LoggedItem;
    onDelete: (item: LoggedItem) => void;
}
const LoggedItemElement = ({ item, onDelete }: ProductListElementProps) => {
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    };
    const [warning, setWarning] = useState(false);
    const [warningColor, setWarningColor] = useState('red');
    const productData: Product = item.product;
    useEffect(() => {
        if (item.expirationDate !== null) {
            const today = new Date();
            const expire = new Date(item.expirationDate);
            if (today.getTime() > expire.getTime()) {
                setWarningColor('red');
                setWarning(true);
            } else if (today > expire.getTime() - 86400000) {
                setWarningColor('orange');
                setWarning(true);
            }
        }
    }, [item.expirationDate]);
    return (
        <TouchableOpacity
            onLongPress={() => {
                ActionSheetIOS.showActionSheetWithOptions(
                    {
                        options: ['Delete', 'Cancel'],
                        destructiveButtonIndex: 0,
                        cancelButtonIndex: 1,
                        userInterfaceStyle: 'dark',
                    },
                    (buttonIndex) => {
                        if (buttonIndex === 1) {
                            // cancel action
                        } else if (buttonIndex === 0) {
                            Alert.alert(
                                'Confirm Deletion',
                                'Are you sure you want to delete this item?',

                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => {},
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Confirm',
                                        onPress: () => {
                                            onDelete(item);
                                        },
                                        style: 'destructive',
                                    },
                                ]
                            );
                        }
                    }
                );
            }}
            onPress={() => {
                router.navigate({
                    pathname: `/inventory_screens/productsview/${productData.upca}`,
                    params: {
                        product: JSON.stringify(productData),
                    },
                });
            }}
            style={[InventoryStyles.button, InventoryStyles.locationDetailsButton]}
        >
            <View style={LoggedItemElementStyles.locationDetailsButtonInternal}>
                {productData !== undefined ? (
                    <>
                        <View style={InventoryStyles.loggedItemDetailsContainer}>
                            <Text style={[LoggedItemElementStyles.buttonTitle]}>{productData.title}</Text>
                            <View style={InventoryStyles.loggedItemDetailsSection}>
                                <View style={LoggedItemElementStyles.datesContainer}>
                                    <Text
                                        style={[
                                            InventoryStyles.locationDetailsButtonSubtitle,
                                            InventoryStyles.buttonText,
                                        ]}
                                    >
                                        Date Logged
                                    </Text>
                                    <Text style={InventoryStyles.buttonText}>
                                        {formatDate(new Date(item.dateLogged))}
                                    </Text>
                                    {item.expirationDate !== null ? (
                                        <>
                                            <Text
                                                style={[
                                                    InventoryStyles.locationDetailsButtonSubtitle,
                                                    InventoryStyles.buttonText,
                                                ]}
                                            >
                                                Expiration Date
                                            </Text>
                                            <Text style={InventoryStyles.buttonText}>
                                                {formatDate(new Date(item.expirationDate))}
                                            </Text>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                                <View style-={LoggedItemElementStyles.warningContainer}>
                                    {warning ? (
                                        <MaterialIcons name={'warning'} color={warningColor} size={30} />
                                    ) : (
                                        <></>
                                    )}
                                </View>
                            </View>
                        </View>
                    </>
                ) : (
                    <Text style={InventoryStyles.buttonText}>{item.product}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};
export default LoggedItemElement;
