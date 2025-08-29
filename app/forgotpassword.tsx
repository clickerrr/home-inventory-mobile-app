import GlobalStyles from '@/styles/GlobalStyles';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

import audioSource from '@/assets/audio/wompwomp.mp3';
const ForgotPassword = () => {
    const player = useAudioPlayer(audioSource);
    useEffect(() => {
        player.seekTo(0);
        player.volume = 0.1;
        player.play();
        const intervalId = setInterval(() => {
            router.back();
            clearInterval(intervalId);
            if (player != null || player != undefined) {
                player.pause();
            }
        }, 4000);
    }, [player]);
    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <Text>lol too bad</Text>
            </View>
        </View>
    );
};
export default ForgotPassword;
