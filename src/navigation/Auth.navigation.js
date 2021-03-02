import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens/Auth/Login';
import {View, Text} from 'react-native';

const AppStack = createStackNavigator();

export const AppNav = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Login" component={Login} />
    </AppStack.Navigator>
  );
};
