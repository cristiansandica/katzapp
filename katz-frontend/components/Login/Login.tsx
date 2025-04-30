import { View, StyleSheet, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { RootStackParamList } from '../../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider.tsx';
import { signInWithGoogle } from '../../utils/googleSignin';
import useUser from '../../helpers/loginHelper.ts';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

GoogleSignin.configure({
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    // androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
});

const Login = ({ navigation }: Props) => {
    const { checkSignedIn } = useAuth();
    const { signInUser } = useUser();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('login');

    useEffect(() => {
        const checkUser = async () => {
            await checkSignedIn(navigation);
            setLoading(false);
        }
        checkUser();
    }, [])

    const handleLogin = async () => {
        console.log('intra1');
        try {
            const { user, idToken } = await signInWithGoogle();
            console.log(user, 'intraUser');

            if (user) {
                await signInUser(user, idToken, navigation);
            }
        } catch (e) {
            console.error(e, 'Google login failed')
        }
    };
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <LinearGradient colors={["#FFF7ED", "#FFEDD5"]} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoid}
                >
                    <View style={{ flex: 2, maxHeight: 250, justifyContent: 'center' }}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Welcome to Katz App</Text>
                            <Text style={styles.cardDescription}>Sign in to start caring for your virtual kitty</Text>
                        </View>
                        <View style={styles.tabContainer}>
                            <TouchableOpacity
                                style={[styles.tab, activeTab === "login" && styles.activeTab]}
                                onPress={() => setActiveTab("login")}>
                                <Text style={[styles.tabText, activeTab === "login" && styles.activeTabText]}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tab, activeTab === "signup" && styles.activeTab]}
                                onPress={() => setActiveTab("signup")}>
                                <Text style={[styles.tabText, activeTab === "signup" && styles.activeTabText]}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{...styles.scrollContent}}>
                        {activeTab === 'login' ? (
                            <View style={styles.form}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="kitty@example.com"

                                        //   onChangeText={"setEmail"}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your password"
                                        // value={"password"}
                                        //   onChangeText={setPassword}
                                        secureTextEntry
                                    />
                                </View>

                                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                                <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 15 }} />

                                <GoogleSigninButton
                                    style={{ width: 'auto' }}
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Dark}
                                    onPress={handleLogin}
                                />
                            </View>
                        ) : (
                            <View style={styles.form}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="kitty@example.com"
                                        // value={"email"}
                                        // onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Create a password"
                                        // value={"password"}
                                        // onChangeText={setPassword}
                                        secureTextEntry
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Confirm Password</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm your password"
                                        // value={"confirmPassword"}
                                        // onChangeText={setConfirmPassword}
                                        secureTextEntry
                                    />
                                </View>

                                <TouchableOpacity style={styles.button}
                                //  onPress={handleSignup}
                                >
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>

                            </View>
                        )}
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1,
        padding: 20,
    },
    scrollContent: {
        flex: 4,
    },
    card: {
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
        alignItems: 'center'
    },
    cardHeader: {
        alignItems: "center",
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#EA580C",
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: "#9A3412",
        textAlign: "center",
    },
    tabContainer: {
        flexDirection: "row",
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
        padding: 2,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    tabText: {
        fontWeight: "500",
        color: "#666",
    },
    activeTabText: {
        color: "#EA580C",
    },
    form: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 6,
        color: "#333",
    },
    input: {
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#F97316",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    footerText: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },
})

export default Login;