import InventorySelectorStyles from '@/styles/components/InventorySelectorStyles';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface InventorySelectorProps {
    inventoryList: Inventory[];
    setSelectedInventory: (value: Inventory) => void;
}

const InventorySelector = ({ inventoryList, setSelectedInventory }) => {
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [dropdownValue, setDropdownValue] = useState(null);

    return (
        <Dropdown
            style={InventorySelectorStyles.dropdown}
            data={dropdownOptions}
            labelField="title"
            valueField="id"
            value={dropdownValue}
            onChange={(value) => {
                setSelectedInventory(value);
            }}
        />
    );
};
export default InventorySelector;
