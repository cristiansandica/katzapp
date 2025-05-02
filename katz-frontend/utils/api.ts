// import statusCodes along with GoogleSignin
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { CreatedUser, CreateKatz, CreateUser, Katz, RootStackParamList, User } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const handleSignOut = async <
    T extends keyof RootStackParamList = keyof RootStackParamList
>({
    setToken,
    navigation,
    redirectTo
}: {
    setToken: (token: string | null) => void;
    navigation: NativeStackNavigationProp<RootStackParamList, T>;
    redirectTo: keyof RootStackParamList;
}) => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        setToken(null);
        navigation.reset({
            index: 0,
            routes: [{ name: redirectTo }],
        });
    } catch (err) {
        console.error('Sign out error:', err);
    }
};

export const createUser = async (token: string): Promise<User> => {
    const resp = await fetch(`${process.env.BASE_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });

    return resp.json();
}

export const signInUser = async (user: { email: string; password: string }): Promise<{ access_token: string }> => {
    const resp = await fetch(`${process.env.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!resp.ok) {
        const errorBody = await resp.json();
        throw new Error(errorBody.message || 'Login failed');
    }

    return await resp.json();
};

export const signUpUser = async (user: { email: string; password: string }) => {
    const resp = await fetch(`${process.env.BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const data = await resp.json();
    console.log("CreatedUser: ", data);

    if(!resp.ok){
        throw new Error(data.message)
    }

    return data;
}

export const createKatz = async (token: string | null, name: string, imageUrl: string) => {
    const response = await fetch(`${process.env.BASE_URL}/katz/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name,
            imageUrl,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Create Katz failed: ${error}`);
    }

    return await response.json();
};

export const getUserKatz = async (token: string): Promise<Katz> => {
    const resp = await fetch(`${process.env.BASE_URL}/katz/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
    console.log('getUserKatz', resp);

    return await resp.json();
}

export const authAPI = {
    validateToken: async ({ token }: { token: string }) => {
        const response = await fetch(`${process.env.GOOGLE_API}/tokeninfo?id_token=${token}`);

        if (!response.ok) {
            throw new Error('Token validation failed');
        }

        return await response.json();
    }
};