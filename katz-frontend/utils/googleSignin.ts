import {
    GoogleSignin,
    statusCodes,
    isErrorWithCode,
} from '@react-native-google-signin/google-signin';

export const GOOGLE_IOS_CLIENT_ID = "837176358939-li9poveeflqqbprk143ds2iih9ln1m5t.apps.googleusercontent.com";
export const GOOGLE_WEB_CLIENT_ID = "837176358939-cmpiqetb2q7rjnjassdc0r5qm2ko3don.apps.googleusercontent.com";

export const configureGoogleSignin = () => {
    GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
    });
};

export const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return {
            user: userInfo.data?.user,
            idToken: userInfo.data?.idToken!,
        };
    } catch (error) {
        if (isErrorWithCode(error)) {
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    console.warn('User cancelled the login flow');
                    break;
                case statusCodes.IN_PROGRESS:
                    console.warn('Sign in operation is in progress already');
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    console.warn('Play Services not available or outdated');
                    break;
                default:
                    console.warn('Unhandled sign-in error:', error);
            }
        } else {
            console.error('Unknown error during Google Sign-In:', error);
        }
        throw error;
    }
};

export const trySilentSignIn = async () => {
    try {
        return await GoogleSignin.signInSilently();
    } catch (error) {
        console.warn('Silent sign-in failed:', error);
        return null;
    }
};

export const signOutFromGoogle = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
};