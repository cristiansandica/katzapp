
import { useAuth } from "../context/AuthProvider";
import { createUser, getUserKatz, signInUser } from '../utils/api';
import { GoogleUser, Katz, RootStackParamList, User } from '../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const useUser = () => {
    const { setToken, setUser, setKatz } = useAuth();
    const setUserData = (user: GoogleUser | undefined, token: string) => {
        setToken(token);
        setUser({ uid: user?.id ?? '', email: user?.email ?? '' });
    }

    const signInGoogleUser = async  <T extends keyof RootStackParamList = keyof RootStackParamList>(
        user: GoogleUser | undefined,
        token: string,
        navigation: NativeStackNavigationProp<RootStackParamList, T>) => {
        if (token) {
            setUserData(user, token)

            try {
                await createUser(token);
                const katz = await getUserKatz(token);
                console.log("Fetched katz from googleUser: ", katz);

                if (katz && katz.name && katz.imageUrl) {
                    setKatz(katz);
                    navigation.replace('KatzUI');
                } else {
                    navigation.replace('CreateKatzName');
                }
            } catch (e) {
                console.error("Error during signin: ", e)
            }
        }
    }

    const decodeJwt = (token: string) => {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
      };

    const signInCredentialsUser = async <T extends keyof RootStackParamList = keyof RootStackParamList>(
        credentials: { email: string; password: string },
        navigation: NativeStackNavigationProp<RootStackParamList, T>
    ) => {
        try {
            const { access_token } = await signInUser(credentials);
            setToken(access_token);
            const user = decodeJwt(access_token) as User;
            setUser(user);

            let katz: Katz | null = null;
            try {
                katz = await getUserKatz(access_token);
            }
            catch (err) {
                console.log(err);
            }

            console.log("Fetched katz from credentialUser: ", katz);

            if (katz && katz.name && katz.imageUrl) {
                setKatz(katz);
                navigation.replace('KatzUI');
            } else {
                navigation.replace('CreateKatzName');
            }
        } catch (e) {
            console.error("Error during email/password login: ", e);
        }
    }

    return { signInGoogleUser, signInCredentialsUser };
}

export default useUser;