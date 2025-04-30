import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import RootNavigator from './components/routes/RootNavigatior';
import { AuthProvider } from './context/AuthProvider';
import { ToastProvider } from 'react-native-toast-notifications';

export const GOOGLE_WEB_CLIENT_ID = '837176358939-cmpiqetb2q7rjnjassdc0r5qm2ko3don.apps.googleusercontent.com'
export const GOOGLE_IOS_CLIENT_ID = '837176358939-li9poveeflqqbprk143ds2iih9ln1m5t.apps.googleusercontent.com'

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
  forceCodeForRefreshToken: false,
  iosClientId: GOOGLE_IOS_CLIENT_ID,
  offlineAccess: true,
});


function App(): React.JSX.Element {

  return (
    <AuthProvider>
      <ToastProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ToastProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
