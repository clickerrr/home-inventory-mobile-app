import LoadingScreen from '@/components/LoadingScreen';
import GlobalStyles from '@/styles/GlobalStyles';
import { readFromKeyStore } from '@/utils/KeyStore';
import { validateUser } from '@/utils/RequestHandler';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const LandingPage = () => {
    // perform logic checks to see if a user is logged in already.
    // checking for presence of jwt token in the keystore
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        validateUser().then((userValid) => {
            console.log(userValid);
            if (userValid) {
                const intervalId = setInterval(() => {
                    clearInterval(intervalId);
                    setIsLoading(false);
                    router.replace('/(tabs)');
                }, 1000);
            } else {
                const intervalId = setInterval(() => {
                    clearInterval(intervalId);
                    setIsLoading(false);
                    router.replace('/login');
                }, 1000);
            }
        });
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <Text>Landing Page</Text>
                <TouchableOpacity
                    onPress={() => {
                        router.navigate('/login');
                    }}
                >
                    <Text>Go to login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default LandingPage;
