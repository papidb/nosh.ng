import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppNav} from './Auth.navigation';

export const Main = () => {
  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
};
