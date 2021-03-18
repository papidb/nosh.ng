import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Host} from 'react-native-portalize';
import {connect} from 'react-redux';

import {AuthNav} from './Auth.navigation';
import {AppNav} from './App.navigation';

const MainNavigation = ({authenticated}) => {
  // const {authenticated} = useStore().getState();
  return (
    <NavigationContainer>
      <Host>{authenticated ? <AppNav /> : <AuthNav />}</Host>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => state;

export const Main = connect(mapStateToProps)(MainNavigation);
