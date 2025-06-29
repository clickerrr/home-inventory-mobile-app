import { Text, View, ActivityIndicator } from 'react-native';

interface SpinnerProps {
    textToDisplay: string | null;
    color: string | null;
}

const LoadingSpinner = ({ textToDisplay, color }: SpinnerProps) => {
    return (
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            {textToDisplay ? <Text>{textToDisplay}</Text> : <></>}
            <ActivityIndicator size="small" color={color ? color : 'black'} />
        </View>
    );
};
export default LoadingSpinner;
