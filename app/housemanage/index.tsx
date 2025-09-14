import GlobalStyles from '@/styles/GlobalStyles';
import HouseManageStyles from '@/styles/views/HouseManageStyles';
import { House } from '@/types/House';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const HouseManageIndex = () => {
    const [house, setHouse] = useState<House | null>(null);
    const { passedHouse } = useLocalSearchParams();

    const [selectionOptions, setSelectionOptions] = useState<{ id: number; title: string }[]>([]);

    useEffect(() => {
        const parsedHouse: House = JSON.parse(passedHouse);
        setHouse(parsedHouse);
        const options = {
            id: 1,
            title: 'Users',
            link: '/housemanage/users',
        };
        setSelectionOptions([options]);
    }, [passedHouse]);

    const renderItems = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    router.navigate({
                        pathname: item.link,
                        params: { passedHouse: JSON.stringify(house) },
                    });
                }}
                style={HouseManageStyles.listItem}
            >
                <Text style={GlobalStyles.subHeader}>{item.title}</Text>
                <MaterialIcons name="chevron-right" size={20} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <View style={HouseManageStyles.headerContent}>
                    <Text>{house ? `Managing ${house.title}` : ''}</Text>
                </View>
                <View style={HouseManageStyles.content}>
                    <FlatList
                        style={HouseManageStyles.list}
                        data={selectionOptions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItems}
                    />
                </View>
                <View style={HouseManageStyles.footerContent}></View>
            </View>
        </View>
    );
};
export default HouseManageIndex;
