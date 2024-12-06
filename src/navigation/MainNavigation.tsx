import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    const loginData = useSelector((state: any) => state?.user?.loginData);

    return (
        <NavigationContainer fallback={<Loader />}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {(!loginData?.userId || loginData.userId === "") ?
                    <Stack.Screen name='Auth' component={AuthNavigation} />
                    :
                    <Stack.Screen name='HomeNavigation' component={HomeNavigation} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation;
