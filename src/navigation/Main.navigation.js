import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useStore} from 'react-redux';

import {AuthNav} from './Auth.navigation';
import {AppNav} from './App.navigation';

export const Main = () => {
  const {authenticated} = useStore().getState();
  return (
    <NavigationContainer>
      {!authenticated ? <AppNav /> : <AuthNav />}
    </NavigationContainer>
  );
};
