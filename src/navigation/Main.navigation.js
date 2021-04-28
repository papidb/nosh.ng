import React from 'react';

import PropTypes from 'prop-types';
import {NavigationContainer} from '@react-navigation/native';
import {Host} from 'react-native-portalize';
import {connect, useSelector} from 'react-redux';

import {AuthNav} from './Auth.navigation';
import {AppNav} from './App.navigation';
import {BottomTab} from './Bottom.navigation';
import {createStructuredSelector} from 'reselect';
import {selectAuthenticated} from 'selectors';

const MainNavigation = ({authenticated}) => {
  return (
    <NavigationContainer>
      <Host>{authenticated ? <BottomTab /> : <AuthNav />}</Host>
    </NavigationContainer>
  );
};

// selectAuthenticated
const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated,
});

export const Main = connect(mapStateToProps)(MainNavigation);

MainNavigation.propTypes = {
  auth: PropTypes.object,
};
