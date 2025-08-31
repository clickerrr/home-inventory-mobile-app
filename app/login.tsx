import barcodeLogo from '@/assets/images/barcode-logo.png';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import GlobalStyles from '@/styles/GlobalStyles';
import LoginStyles from '@/styles/LoginStyles';
import { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { User } from '@/types/User';
import axios from 'axios';
import { readFromKeyStore, saveToKeyStore } from '@/utils/KeyStore';
import { logError } from '@/utils/ConsoleLog';
import { useAuthentication } from '@/components/AuthContext';

const Login = () => {
    const [usernameInput, setUsernameInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { signIn, isAuthenticated } = useAuthentication();

    const errorCheck = (fieldToCheck: string, fieldTitle: string): boolean => {
        if (fieldToCheck.trim().length == 0) {
            setErrorMessage(`${fieldTitle} can not be empty`);
            return true;
        }
        return false;
    };

    const handleLogin = (passedUsername: string, passedPassword: string) => {
        const error = errorCheck(passedUsername, 'Username') && errorCheck(passedPassword, 'Passwords');
        if (error) return;
        setErrorMessage('');
        const user: User = {
            username: passedUsername,
            password: passedPassword,
        };
        //signIn(user, () => setErrorMessage('Invalid username or password')).then(() => {
        //    if (isAuthenticated) {
        //        router.replace('/(tabs)');
        //    }
        //});

        handleRemoteLogin(user).then((success) => {
            if (success) {
                router.replace('/(tabs)');
            }
        });
    };

    const handleRemoteLogin = async (user: User) => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

        try {
            const response = await axios.post(`${baseUrl}/login`, user, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
            const responseData = response.data;

            console.log(responseData);
            saveToKeyStore('himas_authToken', responseData.authToken);
            saveToKeyStore('himas_refreshToken', responseData.refreshToken);
            return true;
        } catch (e: any) {
            setErrorMessage('Invalid username or password');
            logError(e, 'handleRemoteLogin', 'Login');
            return false;
        }
    };

    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <View style={LoginStyles.headerContent}>
                    <Image style={LoginStyles.icon} source={barcodeLogo} />
                    <Text style={[GlobalStyles.headerText, { fontWeight: 'bold' }]}>HIMaS</Text>
                </View>
                <View style={LoginStyles.content}>
                    <TextInput
                        style={LoginStyles.input}
                        placeholder="Enter username..."
                        placeholderTextColor="#999"
                        textContentType={'username'}
                        value={usernameInput}
                        onChangeText={setUsernameInput}
                    />
                    <TextInput
                        style={LoginStyles.input}
                        placeholder="Enter password..."
                        placeholderTextColor="#999"
                        textContentType={'password'}
                        secureTextEntry={!showPassword}
                        value={passwordInput}
                        onChangeText={setPasswordInput}
                    ></TextInput>
                    <TouchableOpacity
                        style={LoginStyles.showPasswordIcon}
                        onPressIn={() => {
                            setShowPassword(true);
                        }}
                        onPressOut={() => setShowPassword(false)}
                    >
                        <MaterialIcons size={16} name="remove-red-eye" />
                    </TouchableOpacity>
                    <Text style={LoginStyles.errorMessage}>{errorMessage}</Text>
                    <TouchableOpacity
                        style={GlobalStyles.buttonMain}
                        onPress={() => {
                            handleLogin(usernameInput, passwordInput);
                        }}
                    >
                        <Text style={GlobalStyles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={LoginStyles.forgotPassword}
                        onPress={() => {
                            router.navigate('/forgotpassword');
                        }}
                    >
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={LoginStyles.footerContent}>
                    <TouchableOpacity
                        style={GlobalStyles.buttonMain}
                        onPress={() => {
                            router.replace('/register');
                        }}
                    >
                        <Text style={GlobalStyles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <Text style={LoginStyles.copyrightText}>&copy; Bartosz Swiech 2025</Text>
                </View>
            </View>
        </View>
    );
};

export default Login;
