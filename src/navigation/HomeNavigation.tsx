import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import Chat from '../screens/home/Chat';

const Stack = createNativeStackNavigator();

const HomeNavigation = (props: any) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='BottomTabNavigation' component={BottomTabNavigation} />
      <Stack.Screen name='Chat' component={Chat} options={{ headerShown: true }} />

    </Stack.Navigator>
  )
}

export default HomeNavigation