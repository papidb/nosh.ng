/* eslint-disable react/display-name */
import React from 'react';
import {TouchableOpacity as RNTouchableOpacity, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {palette} from 'constants/theme/default';
import {Icon} from 'components';
import {uuid} from 'shared/utils';

import {TransactionNav} from './transaction.navigation';
import {SettingsNav} from './Settings.navigation';
import {HomeNav} from './Home.navigation';
import {GiftCardNav} from './GiftCard.navigation';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Animated, {
  cond,
  eq,
  greaterThan,
  interpolate,
} from 'react-native-reanimated';
// import {withTransition} from 'react-native-redash';
import {timing, withTransition} from 'react-native-redash/lib/module/v1';

const TouchableOpacity = Animated.createAnimatedComponent(RNTouchableOpacity);

const DURATION = 450;

export const Tab = ({
  iconName,
  isFocused,
  onPress,
  active,
  index,
  label,
  transition,
}) => {
  const isActive = eq(active, index);
  const activeTransition = withTransition(isActive, {duration: DURATION});
  const opacity = interpolate(activeTransition, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const flex = interpolate(activeTransition, {
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  return (
    <TouchableOpacity
      accessibilityRole="button"
      // accessibilityState={isFocused ? {selected: true} : {}}
      //   accessibilityLabel={options.tabBarAccessibilityLabel}
      //   testID={options.tabBarTestID}
      onPress={onPress}
      //   onLongPress={onLongPress}
      style={{flex: 1}}
      // style={
      //   ({flex: 1},
      //   [
      //     // isFocused
      //     //   ? {
      //     //       flex: 2.5,
      //     //       backgroundColor: '#023248',
      //     //       borderRadius: 100,
      //     //     }
      //     //   : {},
      //   ])
      // }
      //
    >
      <Animated.View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon name={iconName} size={30} />
        {/* <Animated.View style={{flex: 1, opacity}}>
          <Animated.Text
            style={{
              color: '#30BCED',
              textAlign: 'center',
              fontSize: 13,
              fontWeight: '600',
            }}>
            {label}
          </Animated.Text>
        </Animated.View> */}
      </Animated.View>
    </TouchableOpacity>
  );
};
