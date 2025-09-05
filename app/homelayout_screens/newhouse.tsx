import GlobalStyles from '@/styles/GlobalStyles';
import NewHouseStyles from '@/styles/views/NewHouseStyles';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const NewHouse = () => {
    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <View style={NewHouseStyles.headerContent}></View>
                <View style={NewHouseStyles.content}></View>
                <View style={NewHouseStyles.footerContent}>
                    <TouchableOpacity
                        style={GlobalStyles.buttonMain}
                        onPress={() => {
                            router.back();
                        }}
                    >
                        <Text style={GlobalStyles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default NewHouse;
