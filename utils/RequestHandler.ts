import axios, { AxiosError } from 'axios';
import { readFromKeyStore, saveToKeyStore } from './KeyStore';
import { toLog, logError } from './ConsoleLog';

const fileName = 'RequestHandler';
/*
Flow:
start at index.ts: check to see if refresh token is present
    if present:
        get request for new auth token
        if request 401 (refresh token is expired):
            redirect to login
        prtoLog to (tabs)
    if not present:
        redirect to login
 */
const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

// function for automatically refreshing the auth token, should be called on 401 from one of the functions below
const handleRefresh = async () => {
    toLog('Refreshing auth token', 'handleRefresh', fileName);
    const refreshToken = readFromKeyStore('himas_refreshToken');

    // this situation should never happen, since checks are performed to see if the refresh token exists
    if (refreshToken === null) {
        throw new Error(
            'Refresh token does not exist, this situation should never happen. The application load process may have been bypassed'
        );
    }

    /* 
        refresh token process:

        request endpoint /refreshToken with the authorization of the refresh token

        on successful 201:
            api returns a new auth token
            set that auth token in the keychain
            return true (function success)

        on error
            check if 401:
                if 401:
                    user no longer has a valid refresh token
                    return false
                    ** THIS SHOULD SIGNAL A USER NEEDS TO RELOGIN **

    */
    try {
        const response = await axios.get(`${baseUrl}/refreshToken`, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        if (response) {
            if (response.data) {
                toLog('Refreshed user token', 'handleRefresh', fileName);
                toLog(response.data, 'handleRefresh', fileName);
                saveToKeyStore('himas_authToken', response.data);
            }
        }
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toLog(error.response.data);
            toLog(error.response.status);
            toLog(error.response.headers);
            if (error.status === 401) {
                toLog('User refresh token is no longer valid, must relogin');
                throw new Error('User refresh token is no longer valid. Must relogin');
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            toLog(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            toLog(error.message, 'handleRefresh', fileName);
        }
        logError(error.config);
    }
};

export const postRequest = async (endpoint: string, postContents: Object) => {
    const authToken = readFromKeyStore('himas_authToken');

    // at first we attempt the endpoint with the current auth token we have issued
    try {
        const response = await axios.post(`${baseUrl}/${endpoint}`, postContents, {
            headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        });

        // successfully got a response, return the data
        if (response) {
            toLog(response.data, 'postRequest', fileName);
            return response.data;
        }
    } catch (error: any) {
        const errorResponse = error.response;

        if (errorResponse) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            const status = errorResponse.status;

            // if that status ends up being 401, we have a jwt auth error
            if (status === 401) {
                // attempt a refresh
                await handleRefresh();
                try {
                    const newAuthToken = readFromKeyStore('himas_authToken');
                    const response = await axios.post(`${baseUrl}/${endpoint}`, postContents, {
                        headers: { Authorization: `Bearer ${newAuthToken}`, 'Content-Type': 'application/json' },
                    });

                    // successfully got a response, return the data
                    if (response) {
                        toLog(response.data, 'postRequest', fileName);
                        return response.data;
                    }
                } catch (secondAttemptError: any) {
                    if (secondAttemptError.response) {
                        const secondAttemptStatus = secondAttemptError.response.status;
                        if (secondAttemptStatus === 401) {
                            throw new Error(
                                'User does not have a valid auth token after refresh, something has gone wrong.'
                            );
                        }
                    }
                }
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            logError(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            logError(error.message);
        }
        logError(error, 'postRequest', fileName);
    }
};

// library for get requests
export const getRequest = async (endpoint: string) => {
    const authToken = readFromKeyStore('himas_authToken');

    // at first we attempt the endpoint with the current auth token we have issued
    try {
        const response = await axios.get(`${baseUrl}/${endpoint}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        // successfully got a response, return the data
        if (response) {
            toLog(response.data, 'getRequest', fileName);
            return response.data;
        }
    } catch (error: any) {
        const errorResponse = error.response;

        if (errorResponse) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            const status = errorResponse.status;
            if (status === 404) {
                throw new Error('Scanned product was not found in database');
            }

            // if that status ends up being 401, we have a jwt auth error
            if (status === 401) {
                // attempt a refresh
                await handleRefresh();
                try {
                    const newAuthToken = readFromKeyStore('himas_authToken');
                    const response = await axios.get(`${baseUrl}/${endpoint}`, {
                        headers: { Authorization: `Bearer ${newAuthToken}` },
                    });
                    if (response) {
                        toLog(response.data, 'getRequest', fileName);
                        return response.data;
                    }
                } catch (secondAttemptError: any) {
                    if (secondAttemptError.response) {
                        const secondAttemptStatus = secondAttemptError.response.status;
                        if (secondAttemptStatus === 401) {
                            throw new Error(
                                'User does not have a valid auth token after refresh, something has gone wrong.'
                            );
                        }
                    }
                }
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            toLog(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            toLog(error.message);
        }
        logError(error, 'getRequest', fileName);
    }
};
export const deleteRequest = async (endpoint: string) => {
    const authToken = readFromKeyStore('himas_authToken');

    // at first we attempt the endpoint with the current auth token we have issued
    try {
        const response = await axios.delete(`${baseUrl}/${endpoint}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        // successfully got a response, return the data
        if (response) {
            toLog(response.data, 'deleteRequest', fileName);
        }
    } catch (error: any) {
        const errorResponse = error.response;

        if (errorResponse) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            const status = errorResponse.status;

            // if that status ends up being 401, we have a jwt auth error
            if (status === 401) {
                // attempt a refresh
                await handleRefresh();
                try {
                    const newAuthToken = readFromKeyStore('himas_authToken');
                    const response = await axios.delete(`${baseUrl}/${endpoint}`, {
                        headers: { Authorization: `Bearer ${newAuthToken}` },
                    });

                    // successfully got a response, return the data
                    if (response) {
                        toLog(response.data, 'deleteRequest', fileName);
                    }
                } catch (secondAttemptError: any) {
                    if (secondAttemptError.response) {
                        const secondAttemptStatus = secondAttemptError.response.status;
                        if (secondAttemptStatus === 401) {
                            throw new Error(
                                'User does not have a valid auth token after refresh, something has gone wrong.'
                            );
                        }
                    }
                }
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            logError(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            logError(error.message);
        }
        logError(error, 'deleteRequest', fileName);
    }
};
export const putRequest = async (endpoint: string, putContents: Object) => {
    const authToken = readFromKeyStore('himas_authToken');

    // at first we attempt the endpoint with the current auth token we have issued
    try {
        const response = await axios.put(`${baseUrl}/${endpoint}`, putContents, {
            headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        });

        // successfully got a response, return the data
        if (response) {
            toLog(response.data, 'putRequest', fileName);
            return response.data;
        }
    } catch (error: any) {
        const errorResponse = error.response;

        if (errorResponse) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            const status = errorResponse.status;

            // if that status ends up being 401, we have a jwt auth error
            if (status === 401) {
                // attempt a refresh
                await handleRefresh();
                try {
                    const newAuthToken = readFromKeyStore('himas_authToken');
                    const response = await axios.put(`${baseUrl}/${endpoint}`, putContents, {
                        headers: { Authorization: `Bearer ${newAuthToken}`, 'Content-Type': 'application/json' },
                    });

                    // successfully got a response, return the data
                    if (response) {
                        toLog(response.data, 'putRequest', fileName);
                        return response.data;
                    }
                } catch (secondAttemptError: any) {
                    if (secondAttemptError.response) {
                        const secondAttemptStatus = secondAttemptError.response.status;
                        if (secondAttemptStatus === 401) {
                            throw new Error(
                                'User does not have a valid auth token after refresh, something has gone wrong.'
                            );
                        }
                    }
                }
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            logError(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            logError(error.message);
        }
        logError(error, 'putRequest', fileName);
    }
};
export const validateUser = async () => {
    toLog('Validating user...', 'validateUser', fileName);
    const refreshToken = readFromKeyStore('himas_refreshToken');

    if (refreshToken === null) {
        return false;
    }

    try {
        const response = await axios.get(`${baseUrl}/refreshToken`, {
            headers: { Authorization: `Bearer ${refreshToken}` },
        });

        if (response.data) {
            saveToKeyStore('himas_authToken', response.data);
            toLog('Successfully validated user, assigned new authToken', 'validateUser', fileName);
            return true;
        }
        return false;
    } catch (error: any) {
        toLog(error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toLog(error.response.data);
            toLog(error.response.status);
            toLog(error.response.headers);
            if (error.status === 401) {
                return false;
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            toLog(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            toLog('Error', error.message);
        }
        toLog(error.config);
        return false;
    }
};
