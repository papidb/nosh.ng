import React from 'react';
import {Text} from 'react-native';
import Animated, {eq, SpringUtils, interpolate} from 'react-native-reanimated';
const {View} = Animated;
import {
  withTransition,
  withSpringTransition,
} from 'react-native-redash/lib/module/v1';

export const TextWrapper = ({text, active, index}) => {
  const isActive = eq(active, index);
  const activeTranstion = withTransition(isActive, {duration: 150});

  const bounce = withSpringTransition(activeTranstion, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(100),
  });

  const showText = interpolate(activeTranstion, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const flex = interpolate(activeTranstion, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = interpolate(bounce, {
    inputRange: [0, 1],
    outputRange: [10, 5],
  });

  return (
    <View
      style={{
        position: 'absolute',
        opacity: showText,
        translateY,
        // transform: [{translateY}],
        left: 40,
      }}>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 12,
          // textTransform: 'capitalize',
        }}>
        {text}
      </Text>
    </View>
  );
};
