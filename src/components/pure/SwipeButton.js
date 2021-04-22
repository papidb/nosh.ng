import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import {useState} from 'react';
import Layout from 'constants/Layout';

import {Icon} from 'components';
const BUTTON_WIDTH = Layout.window.width * 0.85;
const BUTTON_HEIGHT = 58;
const BUTTON_PADDING = 6;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;
const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const SwipeButton = ({onToggle, loading, title}) => {
  // Animated value for X translation
  const X = useSharedValue(0);
  // Toggled State
  const [toggled, setToggled] = useState(false);
  // Fires when animation ends
  const handleComplete = (isToggled) => {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onToggle(isToggled);
    }
  };
  // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }
      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else {
        X.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      }
    },
  });
  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const AnimatedStyles = {
    swipeCont: useAnimatedStyle(() => {
      return {};
    }),
    colorWave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + X.value,
        opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
      };
    }),
    swipeable: useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          X.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          ['rgba(48,188,237,0.1)', '#rgba(255,255,255,0.1)'],
        ),
        transform: [{translateX: X.value}],
      };
    }),
    done: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [0.7, 0],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [0.7, 0],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    }),
  };
  return (
    <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
      <AnimatedLinearGradient
        style={[AnimatedStyles.colorWave, styles.colorWave]}
        colors={['#3DAA9D', '#3DAA9D']}
        start={{x: 0.0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <Animated.Text style={styles.done}>DONE</Animated.Text>
      </AnimatedLinearGradient>
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Icon name="icon-forward" size={14} />
          )}
        </Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
        {title}
      </Animated.Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  swipeCont: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: '#023248',
    borderRadius: BUTTON_HEIGHT,
    padding: BUTTON_PADDING,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  done: {
    color: 'white',
    alignSelf: 'center',
    // alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 12,
    // fontWeight: 'bold',
    zIndex: 2,
    // fontFamily: 'Hurme Geometric Sans 2',
    fontFamily: 'Hurme Geometric Sans 2 Bold',
  },
  colorWave: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT,
  },
  swipeable: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
  },
  swipeText: {
    // textAlign: 'right',
    // alignSelf: 'center',
    // justifyContent: 'flex-start',
    fontSize: 12,
    // fontWeight: '600',
    zIndex: 2,
    color: '#3DAA9D',
    fontFamily: 'Hurme Geometric Sans 2 Bold',
  },
});
