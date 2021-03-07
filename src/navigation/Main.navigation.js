import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthNav} from './Auth.navigation';
import {useStore} from 'react-redux';

export const Main = () => {
  const {authenticated} = useStore().getState();
  return (
    <NavigationContainer>
      {authenticated ? <AuthNav /> : <AuthNav />}
    </NavigationContainer>
  );
};
