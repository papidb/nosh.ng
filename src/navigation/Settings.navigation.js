import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {SettingsHome} from 'screens/Settings';
import {palette} from 'constants/theme';

const SettingsStack = createNativeStackNavigator();

export const SettingsNav = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        options={{
          headerHideShadow: true,
          headerStyle: {backgroundColor: palette.mostBg},
          contentStyle: {backgroundColor: palette.mostBg},
          //   headerRight: () => <Text variant="header">Settings History</Text>,
          headerTitle: '',
          headerShown: false,
        }}
        name="SettingsHome"
        component={SettingsHome}
      />
    </SettingsStack.Navigator>
  );
};
