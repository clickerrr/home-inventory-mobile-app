import { View, Text, TouchableOpacity } from 'react-native';
import ProductListElement from './LoggedItemElement';
import { Product } from '@/types/Product';
import { useState } from 'react';
import LoggedItemElement from './LoggedItemElement';
import { LoggedItem } from '@/types/LoggedItem';
import InventoryStyles from '@/styles/InventoryStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ProductListFolderProps {
    items: LoggedItem[];
    itemsCount: number;
}
const LoggedItemFolder = ({ items, itemsCount }: ProductListFolderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const renderItems = () => {
        return items.map((item: LoggedItem) => {
            return <LoggedItemElement key={item.id} item={item} />;
        });
    };
    const renderClosedItem = () => {
        return (
            <TouchableOpacity
                onPress={() => setIsOpen(true)}
                style={[InventoryStyles.button, InventoryStyles.folderButton]}
            >
                <Text style={(InventoryStyles.buttonText, InventoryStyles.locationDetailsButtonTitle)}>
                    {items[0].product.title}
                </Text>
                <View>
                    <Text style={(InventoryStyles.buttonText, InventoryStyles.locationDetailsButtonTitle)}>
                        {itemsCount}
                    </Text>
                    <MaterialIcons size={28} name="folder" color={'black'} />
                </View>
            </TouchableOpacity>
        );
    };
    const renderOpenItem = () => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        setIsOpen(false);
                    }}
                    style={[InventoryStyles.button, InventoryStyles.folderButton]}
                >
                    <Text style={(InventoryStyles.buttonText, InventoryStyles.locationDetailsButtonTitle)}>
                        {items[0].product.title}
                    </Text>
                    <View>
                        <Text style={(InventoryStyles.buttonText, InventoryStyles.locationDetailsButtonTitle)}>
                            {itemsCount}
                        </Text>
                        <MaterialIcons size={28} name="folder-open" color={'black'} />
                    </View>
                </TouchableOpacity>
                {renderItems()}
            </View>
        );
    };
    if (isOpen) {
        return renderOpenItem();
    } else {
        return renderClosedItem();
    }
};
export default LoggedItemFolder;
