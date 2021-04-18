/* eslint-disable react/display-name */
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Header} from 'components';
import {GiftCard} from 'screens/GiftCard';
import {palette} from 'constants/theme';
import {Home, Wallet, HottestCard} from 'screens/Home';

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
      <GiftCardStack.Screen
        options={{
          cardStyle: {backgroundColor: palette.darkBlueButton},
          headerTitle: '',
          header: () => <Header bright />,
        }}
        name="Wallet"
        component={Wallet}
      />
    </GiftCardStack.Navigator>
  );
};
