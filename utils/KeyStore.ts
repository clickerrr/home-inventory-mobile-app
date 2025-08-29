import * as SecureStore from 'expo-secure-store';
export const saveToKeyStore = (key: string, value: any) => {
    SecureStore.setItem(key, value);
};
export const readFromKeyStore = (key: string): any => {
    const result = SecureStore.getItem(key);
    return result;
};
