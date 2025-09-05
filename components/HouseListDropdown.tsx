import HouseListDropdownStyles from '@/styles/components/HouseListDropdownStyles';
import GlobalStyles from '@/styles/GlobalStyles';
import { House } from '@/types/House';
import { toLog } from '@/utils/ConsoleLog';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

/*
 *
                    onChange={function (item: string): void {
                        throw new Error('Function not implemented.');
                    }}
                    data={[]}
                    labelField={''}
                    valueField={''}
 * */
interface HouseListDropdownProps {
    houseList: House[];
    setSelectedHouse: (value: House) => void;
}
const HouseListDropdown = ({ houseList, setSelectedHouse }: HouseListDropdownProps) => {
    const [houseData, setHouseData] = useState<House[]>([]);
    const [selectedHouseId, setSelectedHouseId] = useState<number>();

    useEffect(() => {
        setHouseData(houseList);
    }, [houseList]);

    const findHouseById = (id: number) => {
        return houseList.find((house: House) => house.id === id);
    };

    return (
        <Dropdown
            style={HouseListDropdownStyles.dropdown}
            onChange={(selectedHouse: House) => {
                setSelectedHouse(selectedHouse);
            }}
            selectedTextStyle={[GlobalStyles.headerText, HouseListDropdownStyles.headerText]}
            itemTextStyle={HouseListDropdownStyles.text}
            data={houseData}
            value={selectedHouseId}
            labelField={'title'}
            valueField={'id'}
            placeholder={'Select a House'}
            placeholderStyle={[HouseListDropdownStyles.text]}
        />
    );
};
export default HouseListDropdown;
