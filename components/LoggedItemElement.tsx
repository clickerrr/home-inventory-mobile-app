import GlobalStyles from '@/styles/GlobalStyles';
import InventoryProductStyles from '@/styles/InventoryProductStyles';
import InventoryStyles from '@/styles/InventoryStyles';
import { Product } from '@/types/Product';
import { router } from 'expo-router';
import { TouchableOpacity, Text, View, Image, ActionSheetIOS } from 'react-native';
import tempProductImage from '@/assets/images/temp_product_image.jpg';
import { LoggedItem } from '@/types/LoggedItem';

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
    const productData: Product = item.product;
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
                            onDelete(item);
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
            <View style={InventoryStyles.locationDetailsButtonInternal}>
                {productData !== undefined ? (
                    <>
                        <View style={InventoryStyles.productIconContainer}>
                            <Image style={InventoryStyles.productIcon} source={tempProductImage} />
                        </View>
                        <View style={InventoryStyles.loggedItemDetailsContainer}>
                            <Text style={[InventoryStyles.buttonText, InventoryStyles.locationDetailsButtonTitle]}>
                                {productData.title}
                            </Text>
                            <View style={InventoryStyles.loggedItemDetailsSection}>
                                <Text
                                    style={[InventoryStyles.locationDetailsButtonSubtitle, InventoryStyles.buttonText]}
                                >
                                    Date Logged
                                </Text>
                                <Text style={InventoryStyles.buttonText}>{formatDate(new Date(item.dateLogged))}</Text>
                            </View>
                            <View style={InventoryStyles.loggedItemDetailsSection}>
                                <Text
                                    style={[InventoryStyles.locationDetailsButtonSubtitle, InventoryStyles.buttonText]}
                                >
                                    Expiration Date
                                </Text>
                                <Text style={InventoryStyles.buttonText}>
                                    {formatDate(new Date(item.expirationDate))}
                                </Text>
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
