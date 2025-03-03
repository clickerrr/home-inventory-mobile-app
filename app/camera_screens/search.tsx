import GlobalStyles from '@/styles/GlobalStyles';
import SearchStyles from '@/styles/SearchStyles';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { View, Text, Button, TouchableOpacity } from 'react-native';

const Search = () => (
    <View style={GlobalStyles.main}>
        <View style={SearchStyles.container}>
            <TouchableOpacity
                onPress={() => {
                    router.back();
                }}
                style={GlobalStyles.buttonMain}
            >
                <Text style={GlobalStyles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    </View>
);
export default Search;
