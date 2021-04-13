import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Header} from 'components';
import {SettingsHome} from 'screens/Settings';
import {palette} from 'constants/theme';

const SettingsStack = createStackNavigator();

export const SettingsNav = () => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerHideShadow: true,
        cardStyle: {backgroundColor: palette.mostBgPure},
        headerTitle: '',
        header: Header,
        headerShown: true,
      }}>
      <SettingsStack.Screen name="SettingsHome" component={SettingsHome} />
    </SettingsStack.Navigator>
  );
};
