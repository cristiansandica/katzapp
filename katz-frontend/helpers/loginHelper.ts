
import { useAuth } from "../context/AuthProvider";
import { createUser, getUserKatz } from '../utils/api';
import { GoogleUser, RootStackParamList } from '../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const useUser = () => {
    const { setToken, setUser, setKatz } = useAuth();
    const setUserData = (user: GoogleUser | undefined, token: string) => {
        setToken(token);
        setUser({ uid: user?.id ?? '', email: user?.email ?? '' });
    }

    const signInUser = async  <T extends keyof RootStackParamList = keyof RootStackParamList>(
        user: GoogleUser | undefined,
        token: string,
        navigation: NativeStackNavigationProp<RootStackParamList, T>) => {
        if (token) {
            setUserData(user, token)

            try {
                await createUser(token);
                const katz = await getUserKatz(token);
                console.log(katz, "fetched katz");
                console.log('Katz fround: :', katz, katz.name, katz.imageUrl);

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

    return { signInUser };
}

export default useUser;