import GlobalStyles from '@/styles/GlobalStyles';
import { Text, View } from 'react-native';
import LoadingSpinner from './LoadingSpinner';

const LoadingScreen = () => {
    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <LoadingSpinner textToDisplay={'Loading... '} color={'black'} textSize={16} />
            </View>
        </View>
    );
};
export default LoadingScreen;
