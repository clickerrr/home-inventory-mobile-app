import { View, Text, TouchableOpacity } from 'react-native';
import ProductListElement from './LoggedItemElement';
import { Product } from '@/types/Product';
import { useState } from 'react';
import LoggedItemElement from './LoggedItemElement';
import { LoggedItem } from '@/types/LoggedItem';
import InventoryStyles from '@/styles/InventoryStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LoggedItemElementStyles from '@/styles/components/LoggedItemElementStyles';

interface ProductListFolderProps {
    items: LoggedItem[];
    itemsCount: number;
    onDelete: (item: LoggedItem) => void;
}
const LoggedItemFolder = ({ items, itemsCount, onDelete }: ProductListFolderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const renderItems = () => {
        return items.map((item: LoggedItem) => {
            return <LoggedItemElement onDelete={onDelete} key={item.id} item={item} />;
        });
    };
    const renderClosedItem = () => {
        return (
            <TouchableOpacity onPress={() => setIsOpen(true)} style={LoggedItemElementStyles.folderButton}>
                <View style={LoggedItemElementStyles.buttonSectionLeft}>
                    <Text style={LoggedItemElementStyles.buttonTitle}>{items[0].product.title}</Text>
                </View>
                <View style={LoggedItemElementStyles.buttonSectionRight}>
                    <Text style={LoggedItemElementStyles.buttonTitle}>{itemsCount}</Text>
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
                    style={LoggedItemElementStyles.folderButton}
                >
                    <View style={LoggedItemElementStyles.buttonSectionLeft}>
                        <Text style={LoggedItemElementStyles.buttonTitle}>{items[0].product.title}</Text>
                    </View>
                    <View style={LoggedItemElementStyles.buttonSectionRight}>
                        <Text style={LoggedItemElementStyles.buttonTitle}>{itemsCount}</Text>
                        <MaterialIcons size={28} name="folder-open" color={'black'} />
                    </View>
                </TouchableOpacity>
                <View style={LoggedItemElementStyles.folderSubView}>{renderItems()}</View>
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
