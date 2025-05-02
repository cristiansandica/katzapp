import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { RootStackParamList } from '../../utils/types';
import { handleSignOut } from '../../utils/api';
import { useAuth } from '../../context/AuthProvider';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateKatzName'>;

const CreateKatzName = ({ navigation }: Props) => {
    const [name, setName] = useState('');
    const { setToken } = useAuth();

    useEffect(() => {
        navigation.setOptions({
            headerBackVisible: false,
            headerRight: () => (
                <Button title="Sign Out" onPress={async () => {
                    await handleSignOut({
                        setToken,
                        navigation: navigation,
                        redirectTo: "PrelanderKatz"
                    })
                    navigation.navigate("PrelanderKatz")
                }
                } />
            )
        });
    }, [navigation]);

    return (
        <LinearGradient colors={["#FFF7ED", "#FFEDD5"]} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Name Your Katz</Text>
                        <Text style={styles.cardDescription}>What would you like to call your new furry friend?</Text>
                    </View>

                    {/* <View style={styles.imageContainer}>
                        <Image
                            source={require("../assets/cat-silhouette.png")}
                            style={styles.catImage}
                            resizeMode="contain" />
                    </View> */}

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter a name for your Katz"
                            value={name}
                            onChangeText={setName}
                            maxLength={20}
                            textAlign="center"
                        />

                        <TouchableOpacity
                            style={[styles.button, !name.trim() && styles.buttonDisabled]}
                            disabled={!name.trim()}
                        >
                            <Button
                                title="Next"
                                onPress={async () => {
                                    try {
                                        navigation.navigate('CreateKatzImage', { selectedName: name });
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }}
                                disabled={!name.trim()}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.footerText}>Choose a name that reflects your Katz's personality!</Text>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
    imageContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    catImage: {
        width: 120,
        height: 120,
    },
    form: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#F97316",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#FDA382",
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
    inner: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-around',
    },
    label: {
        fontSize: 20,
        marginBottom: 10
    }
});

export default CreateKatzName;