import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Header} from 'components';
import {GiftCard} from 'screens/GiftCard';
import {palette} from 'constants/theme';

const GiftCardStack = createStackNavigator();

export const GiftCardNav = () => {
  return (
    <GiftCardStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerHideShadow: true,
        cardStyle: {backgroundColor: palette.mostBgPure},
        headerTitle: '',
        header: Header,
        headerShown: true,
      }}>
      <GiftCardStack.Screen name="GiftCard" component={GiftCard} />
    </GiftCardStack.Navigator>
  );
};
