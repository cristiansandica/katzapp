import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrelanderKatz from '../KatzSetupScreen/PrelanderKatz';
import CreateKatzImage from '../KatzSetupScreen/CreateKatzImage';
import CreateKatzName from '../KatzSetupScreen/CreateKatzName';
import KatzUI from '../KatzUI';
import { RootStackParamList } from '../../utils/types';
import Login from '../Login/Login';


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="PrelanderKatz">
            <Stack.Screen name="PrelanderKatz" component={PrelanderKatz} />
            <Stack.Screen name="Login" >
                {(navProps) => <Login {...navProps} />}
            </Stack.Screen>
            <Stack.Screen name="CreateKatzName" component={CreateKatzName} />
            <Stack.Screen name="CreateKatzImage" component={CreateKatzImage} />
            <Stack.Screen name="KatzUI" component={KatzUI} />
        </Stack.Navigator>
    );
};

export default RootNavigator;