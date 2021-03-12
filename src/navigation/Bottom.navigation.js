import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {palette} from 'constants/theme/default';
import {Icon} from 'components/pure';
import {TransactionNav} from './transaction.navigation';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: palette.greyish,
          borderRadius: 20,
          minHeight: 60,
        },
        labelStyle: {
          //   fontFamily: 'BwModelica-Bold',
        },
        activeTintColor: '#2B8D86',
        inactiveTintColor: '#A2A2A2',
      }}>
      <Tab.Screen
        name="Transaction"
        options={{
          title: 'DashBoard',
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Icon name={'icon-dashboard-active'} color={color} size={size} />
            ) : (
              <Icon
                name={'icon-dashboard-inactive'}
                color={color}
                size={size}
              />
            ),
        }}
        component={TransactionNav}
      />
    </Tab.Navigator>
  );
};
