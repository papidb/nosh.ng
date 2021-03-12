import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {BottomTab} from './Bottom.navigation';

const RootStack = createStackNavigator();

export const AppNav = () => {
  return (
    <RootStack.Navigator mode="modal">
      <>
        <RootStack.Screen
          name="Root"
          component={BottomTab}
          options={{
            title: '',
            headerStyle: {
              //   backgroundColor: palette.white,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
        />
      </>
    </RootStack.Navigator>
  );
};
