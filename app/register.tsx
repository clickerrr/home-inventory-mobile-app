import GlobalStyles from '@/styles/GlobalStyles';
import RegisterStyles from '@/styles/RegisterStyles';
import barcodeLogo from '@/assets/images/barcode-logo.png';
import { Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { useState } from 'react';
import { NewUser } from '@/types/NewUser';
import axios from 'axios';
import { toLog } from '@/utils/ConsoleLog';

const Register = () => {
    const [usernameInput, setUsernameInput] = useState<string>('');
    const [emailInput, setEmailInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string>('');

    const errorCheck = (fieldToCheck: string, fieldTitle: string): boolean => {
        if (fieldToCheck.trim().length == 0) {
            setErrorMessage(`${fieldTitle} can not be empty`);
            return true;
        }
        return false;
    };

    const checkPasswords = (firstPass: string, secondPass: string): boolean => {
        return firstPass.trim() === secondPass.trim();
    };

    const handleRegister = (
        passedUsername: string,
        passedEmail: string,
        passedPassword: string,
        passedConfirmPassword: string
    ) => {
        const error =
            errorCheck(passedUsername, 'Username') &&
            errorCheck(passedEmail, 'Email') &&
            errorCheck(passedPassword, 'Passwords') &&
            errorCheck(passedConfirmPassword, 'Passwords') &&
            checkPasswords(passedPassword, passedConfirmPassword);
        if (error) return;

        const user: NewUser = {
            username: passedUsername,
            email: passedEmail,
            password: passedPassword,
        };

        handleRemoteRegister(user);
    };

    const handleRemoteRegister = async (user: NewUser) => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
        console.log('Sending registration request');
        const response = await axios.post(`${baseUrl}/register`, user).catch((error) => {
            toLog(error);
            if (error) {
                if (error.status === 409) {
                    setErrorMessage(
                        'Username or email already taken. If you forgot your password, please request a new password.'
                    );
                }
            }
        });
        if (response) {
            Alert.alert('Success', `Successfully registered user: ${JSON.stringify(user)}`, [
                {
                    text: 'OK',
                    onPress: () => {
                        router.replace('/login');
                    },
                },
            ]);
        }
        console.log('Received response: ', response);
    };
    return (
        <View style={GlobalStyles.main}>
            <View style={GlobalStyles.container}>
                <View style={RegisterStyles.headerContent}>
                    <Image style={RegisterStyles.icon} source={barcodeLogo} />
                    <Text style={[GlobalStyles.headerText, { fontWeight: 'bold' }]}>HIMaS</Text>
                </View>
                <View style={RegisterStyles.content}>
                    <TextInput
                        style={RegisterStyles.input}
                        placeholder="Enter username..."
                        placeholderTextColor="#999"
                        textContentType={'username'}
                        value={usernameInput}
                        onChangeText={setUsernameInput}
                    />
                    <TextInput
                        style={RegisterStyles.input}
                        placeholder="Enter email..."
                        placeholderTextColor="#999"
                        textContentType={'emailAddress'}
                        value={emailInput}
                        onChangeText={setEmailInput}
                    />
                    <TextInput
                        style={RegisterStyles.input}
                        placeholder="Enter password..."
                        placeholderTextColor="#999"
                        textContentType={'password'}
                        secureTextEntry={!showPassword}
                        value={passwordInput}
                        onChangeText={setPasswordInput}
                    ></TextInput>
                    <TextInput
                        style={RegisterStyles.input}
                        placeholder="Confirm Password..."
                        placeholderTextColor="#999"
                        textContentType={'password'}
                        secureTextEntry={!showPassword}
                        value={confirmPasswordInput}
                        onChangeText={setConfirmPasswordInput}
                    ></TextInput>
                    <TouchableOpacity
                        style={RegisterStyles.showPasswordIcon}
                        onPressIn={() => {
                            setShowPassword(true);
                        }}
                        onPressOut={() => setShowPassword(false)}
                    >
                        <MaterialIcons size={16} name="remove-red-eye" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={GlobalStyles.buttonMain}
                        onPress={() => {
                            handleRegister(usernameInput, emailInput, passwordInput, confirmPasswordInput);
                        }}
                    >
                        <Text style={GlobalStyles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <Text style={RegisterStyles.errorMessage}>{errorMessage}</Text>
                </View>
                <View style={RegisterStyles.footerContent}>
                    <TouchableOpacity
                        style={RegisterStyles.returnToLogin}
                        onPress={() => {
                            router.replace('/login');
                        }}
                    >
                        <Text>Return to Login</Text>
                    </TouchableOpacity>
                    <Text style={RegisterStyles.copyrightText}>&copy; Bartosz Swiech 2025</Text>
                </View>
            </View>
        </View>
    );
};
export default Register;
