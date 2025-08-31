import { useAuthentication } from '@/components/AuthContext';
import LoadingScreen from '@/components/LoadingScreen';
import GlobalStyles from '@/styles/GlobalStyles';
import { toLog } from '@/utils/ConsoleLog';
import { validateUser } from '@/utils/RequestHandler';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const LandingPage = () => {
    // perform logic checks to see if a user is logged in already.
    // checking for presence of jwt token in the keystore
    const [isLoading, setIsLoading] = useState(true);
    const { checkIfAuthenticated, isAuthenticated } = useAuthentication();

    useEffect(() => {
        checkIfAuthenticated()
            .then((userValid) => {
                console.log('isAuthenticated', userValid);
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
            })
            .catch((error: any) => {
                toLog(`Error: ${error} thrown while attempting validateUser()`, 'useEffect', 'LandingPage');
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
