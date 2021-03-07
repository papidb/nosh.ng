import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Login, Register} from '../screens/Auth';

const AppStack = createStackNavigator();

export const AppNav = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        header: () => null,
        // TODO: need to import background Color from theme file
        cardStyle: {backgroundColor: '#E5E5E5'},
      }}>
      <AppStack.Screen name="Login" component={Login} />
      <AppStack.Screen name="Register" component={Register} />
    </AppStack.Navigator>
  );
};
