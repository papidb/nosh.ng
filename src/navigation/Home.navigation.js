import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {Home} from 'screens/Home';
import {palette} from 'constants/theme';

const HomeStack = createNativeStackNavigator();

export const HomeNav = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          headerHideShadow: true,
          headerStyle: {backgroundColor: palette.mostBg},
          contentStyle: {backgroundColor: palette.mostBg},
          //   headerRight: () => <Text variant="header">Transaction History</Text>,
          headerTitle: '',
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
    </HomeStack.Navigator>
  );
};
