import { Text, View, ActivityIndicator } from 'react-native';

interface SpinnerProps {
    textToDisplay: string | null;
    textSize: number | null;
    color: string | null;
}

const LoadingSpinner = ({ textToDisplay, textSize, color }: SpinnerProps) => {
    return (
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            {textToDisplay ? <Text style={{ fontSize: textSize ? textSize : 16 }}>{textToDisplay}</Text> : <></>}
            <ActivityIndicator size="small" color={color ? color : 'black'} />
        </View>
    );
};
export default LoadingSpinner;
