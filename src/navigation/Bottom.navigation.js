/* eslint-disable react/display-name */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {palette} from 'constants/theme/default';
import {Icon} from 'components';
// import {uuid} from 'shared/utils';

import {TransactionNav} from './transaction.navigation';
import {SettingsNav} from './Settings.navigation';
import {HomeNav} from './Home.navigation';
import {GiftCardNav} from './GiftCard.navigation';
// import Animated from 'react-native-reanimated';
// import {Tab as SingleTab} from './Tab';
// import {TextWrapper} from './TextWrapper';

// import {timing, withTransition} from 'react-native-redash/lib/module/v1';
// import {
//   Value,
//   block,
//   onChange,
//   eq,
//   interpolate,
//   set,
//   useCode,
// } from 'react-native-reanimated';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';

const Tab = AnimatedTabBarNavigator();

// const tabs = ['icon-home', 'icon-giftcard', 'icon-receipt', 'icon-settings'];
export const DURATION = 450;

// function MyTabBar({state, descriptors, navigation}) {
//   // const focusedOptions = descriptors[state.routes[state.index].key].options;

//   // if (focusedOptions.tabBarVisible === false) {
//   //   return null;
//   // }
//   const active = new Value(0);
//   const transition = withTransition(active, {duration: DURATION});
//   const activeTransition = new Value(0);
//   useCode(
//     () =>
//       block([
//         onChange(active, set(activeTransition, 0)),
//         set(activeTransition, timing({duration: DURATION})),
//       ]),
//     [active, activeTransition],
//   );
//   // console.log({transition});

//   return (
//     <View
//       style={{
//         // flex: 1,
//         // position: 'absolute',
//         // zIndex: 90423,
//         flexDirection: 'row',
//         marginBottom: 27,
//         borderRadius: 100,
//         marginHorizontal: 22,
//         height: 62,
//         paddingBottom: 0,
//         alignItems: 'center',
//       }}>
//       {state.routes.map((route, index) => {
//         console.log({route});
//         const {options} = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         const isActive = eq(active, index);
//         const activeTransition = withTransition(isActive, {duration: DURATION});
//         const flex = interpolate(activeTransition, {
//           inputRange: [0, 1],
//           outputRange: [1, 2.5],
//         });
//         const backgroundColor = interpolate(activeTransition, {
//           inputRange: [0, 1],
//           outputRange: ['green', 'red'],
//         });

//         return (
//           <Animated.View
//             style={[
//               styles.tab,
//               isFocused ? {backgroundColor: '#023248'} : {},
//               {flex, backgroundColor},
//             ]}
//             key={uuid()}>
//             <SingleTab
//               iconName={tabs[index]}
//               isFocused={isFocused}
//               onPress={() => {
//                 active.setValue(index);
//                 onPress();
//               }}
//               {...{label, transition, active}}
//             />
//             {/* <TextWrapper {...{activeTransition, text: label, active, index}} /> */}
//           </Animated.View>
//         );
//       })}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    height: 41,
    justifyContent: 'center',
    padding: 8,
    borderRadius: 100,
  },
});

export const BottomTab = () => {
  return (
    <Tab.Navigator
      appearance={{floating: true}}
      tabBarOptions={{
        labelStyle: {
          fontFamily: 'Hurme Geometric Sans 2 Bold',
          // fontWeight: '600',
        },
        keyboardHidesTabBar: true,
        activeTintColor: palette.blue,
        inactiveTintColor: '#A2A2A2',
        showLabel: false,
        activeBackgroundColor: palette.darkBlueButton,
      }}
      // tabBar={(props) => <MyTabBar {...props} />}
      //
    >
      <Tab.Screen
        name="Home"
        options={{
          title: 'Dashboard',
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Icon name={'icon-home'} color={color} size={25} />
            ) : (
              <Icon name={'icon-home'} color={color} size={25} />
            ),
        }}
        component={HomeNav}
      />
      <Tab.Screen
        name="Giftcard"
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Icon name={'icon-giftcard'} color={color} size={25} />
            ) : (
              <Icon name={'icon-giftcard'} color={color} size={25} />
            ),
        }}
        component={GiftCardNav}
      />
      <Tab.Screen
        name="Transaction"
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Icon name={'icon-receipt'} color={color} size={25} />
            ) : (
              <Icon name={'icon-receipt'} color={color} size={25} />
            ),
        }}
        component={TransactionNav}
      />
      <Tab.Screen
        name="Settings"
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Icon name={'icon-settings'} color={color} size={25} />
            ) : (
              <Icon name={'icon-settings'} color={color} size={25} />
            ),
        }}
        component={SettingsNav}
      />
    </Tab.Navigator>
  );
};
