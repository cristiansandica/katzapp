
import React, { createContext, useContext, useState } from 'react'
import { CreateKatz, Katz, RootStackParamList, User } from '../utils/types';
import { trySilentSignIn } from '../utils/googleSignin';
import useUser from '../helpers/loginHelper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthContextType = {
  token: string | null;
  user: User | null;
  katz: Katz | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setKatz: (katz: Katz | null) => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [katz, setKatz] = useState<Katz | null>(null);

  return (
    <AuthContext.Provider value={{ token, user, katz, setToken, setUser, setKatz }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within AuthProvider');

  const checkSignedIn = async  <
    T extends keyof RootStackParamList = keyof RootStackParamList
  >(navigation: NativeStackNavigationProp<RootStackParamList, T>) => {
    try {
      const { signInUser } = useUser();

      const response = await trySilentSignIn();

      if (!response || !response.data || !response.data.idToken)
        throw new Error('Silent Sign In not successful')

      signInUser(response.data.user, response.data.idToken, navigation);
    } catch (err) {
      console.log('User not signed in silently');
    }
  };

  return { ...context, checkSignedIn };
}