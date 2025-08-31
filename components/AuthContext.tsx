import { User } from '@/types/User';
import { logError } from '@/utils/ConsoleLog';
import { deleteFromKeystore, readFromKeyStore, saveToKeyStore } from '@/utils/KeyStore';
import { validateUser } from '@/utils/RequestHandler';
import axios from 'axios';
import { use, createContext, type PropsWithChildren, useState } from 'react';

const AuthContext = createContext<{
    signIn: (user: User, onError: () => void) => Promise<void>;
    signOut: () => Promise<void>;
    checkIfAuthenticated: () => Promise<boolean>;
    isAuthenticated: boolean;
    //isLoading: boolean;
}>({
    signIn: async (user: User, onError: () => void) => Promise<void>,
    signOut: async () => Promise<void>,
    checkIfAuthenticated: async () => false,
    isAuthenticated: false,
    //isLoading: false,
});

// This hook can be used to access the user info.
export function useAuthentication() {
    const value = use(AuthContext);
    if (!value) {
        throw new Error('useAuthentication must be wrapped in a <SessionProvider />');
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //    const [[isLoading, isAuthenticated], setIsAuthenticated] = useStorageState('session');

    return (
        <AuthContext
            value={{
                signIn: async (user: User, onError: () => void) => {
                    // Perform sign-in logic here

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
                        setIsAuthenticated(true);
                    } catch (e: any) {
                        onError();
                        logError(e, 'signIn', 'AuthContext');
                        setIsAuthenticated(false);
                    }
                },
                signOut: async () => {
                    deleteFromKeystore('himas_refreshToken');
                    deleteFromKeystore('himas_authToken');
                    setIsAuthenticated(false);
                },
                checkIfAuthenticated: () => {
                    const validatedUser = Promise.resolve(validateUser());
                    setIsAuthenticated(validatedUser);
                    return validatedUser;
                },
                isAuthenticated,
                //isLoading,
            }}
        >
            {children}
        </AuthContext>
    );
}
