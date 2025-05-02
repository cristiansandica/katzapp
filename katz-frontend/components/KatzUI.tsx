import { useState, useEffect } from 'react';
import React from 'react';
import { ActivityIndicator, Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { handleSignOut } from '../utils/api';
import { useAuth } from '../context/AuthProvider';
import StatusButton from './StatusButton';
import StatusMeter from './StatusMeter';
import { useToast } from 'react-native-toast-notifications';

type Props = NativeStackScreenProps<RootStackParamList, 'KatzUI'>;
const FOOD_DECAY = 1;
const CLEAN_DECAY = 1;
const METER_MIN = 0;
const METER_MAX = 10;

const INITIAL_METERS = [
  { label: '🍔', level: 6, behavior: 'decrease' },
  { label: '🧼', level: 4, behavior: 'decrease' },
  { label: '🛏️', level: 8, behavior: 'static' },
]

const KatzUI = ({ navigation }: Props) => {
  const { katz, setToken } = useAuth();
  const toast = useToast();

  const [meters, setMeters] = useState(INITIAL_METERS);

  const [statusLog, setStatusLog] = useState<{ id: string; message: string }[]>([]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setMeters(prevMeters => prevMeters.map(meter => {
        switch (meter.behavior) {
          case 'decrease':
            return { ...meter, level: Math.max(meter.level - (FOOD_DECAY && CLEAN_DECAY), METER_MIN) };
          default:
            return meter;
        }
      }));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // if (!katz) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" />
  //       <Text style={styles.loadingText}>Loading your Katz...</Text>
  //     </View>
  //   );
  // }

  const handleFeed = (label: string) => {
    setMeters(prevMeters =>
      prevMeters.map(meter =>
        meter.label === label
          ? { ...meter, level: Math.min(meter.level + 1, METER_MAX) }
          : meter
      )
    );

    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    setStatusLog(prevLog => [
      { id: Date.now().toString(), message: `${label} at ${katz?.name} at ${timestamp}` },
      ...prevLog,
    ]);
    toast.show(`${label} fed to ${katz?.name}`, {
      type: 'normal',
      placement: 'top',
      duration: 2000,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.catsName}>{katz?.name}!</Text>
      <Image source={{ uri: katz?.imageUrl }} style={styles.imageView} />

      <StatusMeter meters={meters} />
      <StatusButton
        meters={meters}
        onFeed={handleFeed}
      />
      <FlatList
        data={statusLog}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.logItem}>{item.message}</Text>}
        contentContainerStyle={styles.logElement}
        style={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flatListContainer: {
    height: 100,
    overflow: 'hidden'
  },
  logElement: {
    marginTop: 10,
  },
  logItem: {
    fontSize: 10,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imageContainer: {
    textAlign: "center"
  },
  catsName: {
    textAlign: "center"
  },
  imageView: {
    width: 200,
    height: 200,
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  toggleButton: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
})

export default KatzUI;