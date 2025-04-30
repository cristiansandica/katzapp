import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { createKatz, handleSignOut } from '../../utils/api';
import { useAuth } from '../../context/AuthProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateKatzImage'>;

const katzAssets = [
  { id: '1', uri: 'https://reactnative.dev/docs/assets/p_cat1.png' },
  { id: '2', uri: 'https://reactnative.dev/docs/assets/p_cat2.png' },
];

const CreateKatzImage = ({ route, navigation }: Props) => {
  const { setKatz, setToken, token } = useAuth();
  const { selectedName } = route.params;
  const [selectedAsset, setSelectedAsset] = useState(katzAssets[0].uri);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Sign Out" onPress={async () => {
          await handleSignOut({
            setToken,
            navigation: navigation,
            redirectTo: "PrelanderKatz"
          })
        }
        } />
      ),
    });
  }, [navigation]);

  const handleCreateKatz = async () => {
    try {
      if (!token) {
        console.error('No token fount, cannot createKatz - KatzImageScreen')
      }
      const newKatz = await createKatz(token, selectedName, selectedAsset)
      setKatz(newKatz)
      navigation.navigate('KatzUI');
    } catch (e) {
      console.error('Create Katz error:', e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose your Katz image</Text>
      <FlatList
        data={katzAssets}
        horizontal
        contentContainerStyle={{ paddingVertical: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedAsset(item.uri)}>
            <Image
              source={{ uri: item.uri }}
              style={[
                styles.image,
                selectedAsset === item.uri && styles.selected,
              ]}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Continue"
        onPress={handleCreateKatz}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  label: { fontSize: 20, marginBottom: 10 },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: 'dodgerblue',
  },
});

export default CreateKatzImage;