import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {TransactionHome} from 'screens/Transaction';
import {palette} from 'constants/theme';

const TransactionStack = createNativeStackNavigator();

export const TransactionNav = () => {
  return (
    <TransactionStack.Navigator>
      <TransactionStack.Screen
        options={{
          headerHideShadow: true,
          headerStyle: {backgroundColor: palette.mostBg},
          contentStyle: {backgroundColor: palette.mostBg},
          //   headerRight: () => <Text variant="header">Transaction History</Text>,
          headerTitle: '',
          headerShown: false,
        }}
        name="TransactionHome"
        component={TransactionHome}
      />
    </TransactionStack.Navigator>
  );
};
