/* eslint-disable react/display-name */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Wallet, HottestCard} from 'screens/Home';
import {palette} from 'constants/theme';

import {Header} from 'components';
const HomeStack = createStackNavigator();

// const ScreenWrapper = (props) => <Box>{...props}</Box>;

export const HomeNav = () => {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerHideShadow: true,
        cardStyle: {backgroundColor: palette.mostBgPure},
        headerTitle: '',
        header: Header,
        // headerShown: false,
      }}>
      <HomeStack.Screen
        options={{
          header: Header,
        }}
        name="Home"
        component={Home}
      />
      <HomeStack.Screen
        options={{
          cardStyle: {backgroundColor: palette.darkBlueButton},
          headerTitle: '',
          header: () => <Header bright />,
        }}
        name="HottestCards"
        component={HottestCard}
      />
      <HomeStack.Screen
        options={{
          cardStyle: {backgroundColor: palette.darkBlueButton},
          headerTitle: '',
          header: () => <Header bright />,
        }}
        name="Wallet"
        component={Wallet}
      />
    </HomeStack.Navigator>
  );
};
