import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Users from '../screens/home/Users';
import Setting from '../screens/home/Setting';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = (props: any) => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={'Users'}
                component={Users}
                options={{
                    tabBarLabel: 'Users',
                    tabBarActiveTintColor: 'skyblue',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Image source={require('../assets/png/group.png')} style={{ width: 20, height: 20 }} tintColor={focused ? 'skyblue' : '#000'} />
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={'Setting'}
                component={Setting}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarActiveTintColor: 'skyblue',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Image source={require('../assets/png/setting.png')} style={{ width: 20, height: 20 }} tintColor={focused ? 'skyblue' : '#000'} />
                            </View>
                        );
                    },
                }}
            />

        </Tab.Navigator>
    );
};

export default BottomTabNavigation;
