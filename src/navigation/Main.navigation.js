import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNav} from './Auth.navigation';

export const Main = () => {
  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
};
