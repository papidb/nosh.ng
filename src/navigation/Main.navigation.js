import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {connect, useStore} from 'react-redux';

import {AuthNav} from './Auth.navigation';
import {AppNav} from './App.navigation';

const MainNavigation = ({authenticated}) => {
  // const {authenticated} = useStore().getState();
  return (
    <NavigationContainer>
      {authenticated ? <AppNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => state;

export const Main = connect(mapStateToProps)(MainNavigation);
