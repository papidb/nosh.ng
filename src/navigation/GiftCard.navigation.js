import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {GiftCard, SubCategory} from 'screens/GiftCard';
import {palette} from 'constants/theme';

const GiftCardStack = createNativeStackNavigator();

export const GiftCardNav = () => {
  return (
    <GiftCardStack.Navigator>
      <GiftCardStack.Screen
        options={{
          headerHideShadow: true,
          headerStyle: {backgroundColor: palette.mostBg},
          contentStyle: {backgroundColor: palette.mostBg},
          //   headerRight: () => <Text variant="header">Transaction History</Text>,
          headerTitle: '',
          headerShown: false,
        }}
        name="GiftCard"
        component={GiftCard}
      />
      <GiftCardStack.Screen
        options={{
          headerHideShadow: true,
          headerStyle: {backgroundColor: palette.mostBg},
          contentStyle: {backgroundColor: palette.mostBg},
          //   headerRight: () => <Text variant="header">Transaction History</Text>,
          headerTitle: '',
          headerShown: false,
        }}
        name="SubCategory"
        component={SubCategory}
      />
    </GiftCardStack.Navigator>
  );
};
