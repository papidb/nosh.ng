import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Header} from 'components';
import {TransactionDetails, TransactionHome} from 'screens/Transaction';
import {palette} from 'constants/theme';

const TransactionStack = createStackNavigator();

export const TransactionNav = () => {
  return (
    <TransactionStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerHideShadow: true,
        cardStyle: {backgroundColor: palette.mostBgPure},
        headerTitle: '',
        header: Header,
        headerShown: true,
      }}>
      <TransactionStack.Screen
        name="TransactionHome"
        component={TransactionHome}
      />
      <TransactionStack.Screen
        name="TransactionDetails"
        component={TransactionDetails}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: palette.darkBlueButton},
          headerTitle: '',
        }}
      />
    </TransactionStack.Navigator>
  );
};
