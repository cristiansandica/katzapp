import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { RootStackParamList } from '../../utils/types';
import { handleSignOut } from '../../utils/api';
import { useAuth } from '../../context/AuthProvider';

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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? 'padding' : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.label}>Name your Katz</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter a name"
                        style={styles.input}
                    />
                    <View style={{ marginTop: 15 }}>
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
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-around',
    },
    label: {
        fontSize: 20,
        marginBottom: 10
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#aaa',
        marginBottom: 20,
    },
});

export default CreateKatzName;