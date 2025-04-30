import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../../utils/types';
import { useAuth } from '../../context/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import KatzImage from '../../assets/images/katzPrelanderImage.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'PrelanderKatz'>;

const PrelanderKatz = ({ navigation }: Props) => {
  const { token, checkSignedIn } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);
  console.log(token, 'tesToken');

  useEffect(() => {
    const checkAuth = async () => {
      await checkSignedIn(navigation);
      setCheckingAuth(false);
    };

    checkAuth();
  }, []);

  if (checkingAuth) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#FFF7ED', '#FFEDD5']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <KatzImage width={200} height={200} />
          <Text style={styles.title}>Katz App</Text>
          <Text style={styles.subtitle}>Create and care for your virtual kitty companion!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EA580C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9A3412',
    textAlign: 'center',
    marginBottom: 32,
  },
  catImage: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#F97316',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PrelanderKatz

