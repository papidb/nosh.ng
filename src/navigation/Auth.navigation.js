import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Login,
  Register,
  EmailVerification,
  PersonalLogin,
  ResetPassword,
} from '../screens/Auth';
import {connect} from 'react-redux';

const AppStack = createStackNavigator();

const AuthScreens = ({user}) => {
  const loggedInBefore = Boolean(user?.email);

  return (
    <AppStack.Navigator
      screenOptions={{
        header: () => null,
        // TODO: need to import background Color from theme file
        cardStyle: {backgroundColor: '#FFF'},
      }}
      initialRouteName={loggedInBefore ? 'PersonalLogin' : 'Login'}>
      <AppStack.Screen name="PersonalLogin" component={PersonalLogin} />
      <AppStack.Screen name="Login" component={Login} />
      <AppStack.Screen name="ResetPassword" component={ResetPassword} />
      <AppStack.Screen name="Register" component={Register} />
      <AppStack.Screen name="EmailVerification" component={EmailVerification} />
    </AppStack.Navigator>
  );
};

const mapStateToProps = ({user}) => ({user});

export const AuthNav = connect(mapStateToProps)(AuthScreens);
