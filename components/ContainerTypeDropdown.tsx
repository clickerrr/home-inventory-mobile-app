import ProductAdderStyles from '@/styles/ProductAdderStyles';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
interface ContainerTypeDropdownProps {
    label: string;
    value: string;
    containerType: string;
    setContainerType: (value: Object) => void;
    containerStyle: Object;
}

const containerOptions = [
    { title: 'Jar', id: 0 },
    { title: 'Bag', id: 1 },
    { title: 'Box', id: 2 },
    { title: 'Can', id: 3 },
    { title: 'Other', id: 4 },
];
const ContainerTypeDropdown = ({
    containerStyle,
    label,
    value,
    containerType,
    setContainerType,
}: ContainerTypeDropdownProps) => {
    useEffect(() => {
        containerOptions.forEach((containerObject) => {
            if (containerType.toLowerCase() == containerObject.title.toLowerCase()) {
                setDataContainer(containerObject.id);
            }
        });
    }, [containerType]);
    const [dataContainer, setDataContainer] = useState(null);
    return (
        <Dropdown
            style={[ProductAdderStyles.dropdown, containerStyle]}
            data={containerOptions}
            labelField="title"
            valueField="id"
            value={dataContainer}
            onChange={(value) => {
                console.log(value);
                setDataContainer(value.id);
                setContainerType(value.title.toUpperCase());
            }}
        />
    );
};
export default ContainerTypeDropdown;
