import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Header} from 'components';
import {BottomTab} from './Bottom.navigation';
import {palette} from 'constants/theme/default';

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
              backgroundColor: palette.mostBg,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            header: Header,
          }}
        />
      </>
    </RootStack.Navigator>
  );
};
