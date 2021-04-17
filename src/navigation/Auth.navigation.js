import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Login,
  Register,
  EmailVerification,
  PersonalLogin,
  ResetPassword,
} from '../screens/Auth';
import {OnBoarding} from '../screens/OnBoarding';
import {connect} from 'react-redux';

const AppStack = createStackNavigator();

const AuthScreens = ({user, onboarded}) => {
  const loggedInBefore = Boolean(user?.email);
  const initialRouteName = onboarded
    ? loggedInBefore
      ? 'PersonalLogin'
      : 'Login'
    : 'OnBoarding';
  // const initialRouteName = 'OnBoarding';
  return (
    <AppStack.Navigator
      screenOptions={{
        header: () => null,
        // TODO: need to import background Color from theme file
        cardStyle: {backgroundColor: '#FFF'},
      }}
      initialRouteName={initialRouteName}>
      <AppStack.Screen name="OnBoarding" component={OnBoarding} />
      <AppStack.Screen name="PersonalLogin" component={PersonalLogin} />
      <AppStack.Screen name="Login" component={Login} />
      <AppStack.Screen name="ResetPassword" component={ResetPassword} />
      <AppStack.Screen name="Register" component={Register} />
      <AppStack.Screen name="EmailVerification" component={EmailVerification} />
    </AppStack.Navigator>
  );
};

const mapStateToProps = ({user, misc}) => ({user, onboarded: misc.onboarded});

export const AuthNav = connect(mapStateToProps)(AuthScreens);
