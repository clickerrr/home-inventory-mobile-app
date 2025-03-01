import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { View, Text, Button, TouchableHighlight } from 'react-native';

const Search = () => (
    <View>
        <View>
            <Text>Search Layout</Text>
            <TouchableHighlight
                onPress={() => {
                    router.back();
                }}
            >
                <Text>Return to Main</Text>
            </TouchableHighlight>
        </View>
    </View>
);
export default Search;
