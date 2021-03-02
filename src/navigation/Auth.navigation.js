import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/Login';
import {View, Text} from 'react-native';

const Login = () => {
  // console.log({LoginScreen})
  // return <LoginScreen />;
  return (
    <View>
      <Text style={{color: 'red'}}>omo,sdsldkdlskdlsdkl</Text>
    </View>
  );
};

const AppStack = createStackNavigator();

export const AppNav = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Login" component={Login} />
    </AppStack.Navigator>
  );
};
