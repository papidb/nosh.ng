/* eslint-disable react/display-name */
import React from 'react';
// import {TouchableOpacity, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import {palette} from 'constants/theme/default';
import {Icon} from 'components';
// import {uuid} from 'shared/utils';

import {TransactionNav} from './transaction.navigation';
import {SettingsNav} from './Settings.navigation';
import {HomeNav} from './Home.navigation';
import {GiftCardNav} from './GiftCard.navigation';

const Tab = createBottomTabNavigator();

// function MyTabBar({state, descriptors, navigation}) {
//   const focusedOptions = descriptors[state.routes[state.index].key].options;

//   if (focusedOptions.tabBarVisible === false) {
//     return null;
//   }

//   return (
//     <View style={{flexDirection: 'row'}}>
//       {state.routes.map((route, index) => {
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

//         return (
//           <TouchableOpacity
//             key={uuid()}
//             accessibilityRole="button"
//             accessibilityState={isFocused ? {selected: true} : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{flex: 1}}>
//             <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

export const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          // flex: 1,
          // position: 'absolute',
          marginBottom: 27,
          borderRadius: 100,
          marginHorizontal: 22,
          height: 62,
          paddingBottom: 0,
        },
        tabStyle: {
          flex: 1,
          // backgroundColor: 'red',
          borderRadius: 100,
          // height: 62,
          alignSelf: 'center',
          justifyContent: 'center',
        },
        labelStyle: {
          fontFamily: 'Hurme Geometric Sans 1',
          fontWeight: 'bold',
        },
        activeTintColor: '#2B8D86',
        inactiveTintColor: '#A2A2A2',
        showLabel: false,
      }}
      // tabBar={(props) => <MyTabBar {...props} />}
      //
    >
      <Tab.Screen
        name="Home"
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Icon name={'icon-home'} color={color} size={size} />
            ) : (
              <Icon name={'icon-home'} color={color} size={size} />
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
              <Icon name={'icon-giftcard'} color={color} size={size} />
            ) : (
              <Icon name={'icon-giftcard'} color={color} size={size} />
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
              <Icon name={'icon-receipt'} color={color} size={size} />
            ) : (
              <Icon name={'icon-receipt'} color={color} size={size} />
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
              <Icon name={'icon-settings'} color={color} size={size} />
            ) : (
              <Icon name={'icon-settings'} color={color} size={size} />
            ),
        }}
        component={SettingsNav}
      />
    </Tab.Navigator>
  );
};
