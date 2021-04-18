import React, {useEffect} from 'react';
// import {ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {commaFormatter} from 'shared/utils';

import {Box, Text} from 'components';

export const Balance = ({user, containerProps}) => {
  const balance = user?.wallet?.balance ?? 0;
  const [balanceWhole, balanceFraction] = String(
    commaFormatter(balance, 2),
  ).split('.');
  // const amount = 267000;
  return (
    <Box
      marginHorizontal="s"
      backgroundColor="white"
      padding="l"
      borderRadius={155}
      justifyContent="center"
      alignItems="center"
      {...containerProps}>
      <Text
        fontSize={12}
        color="primary"
        textAlign="center"
        fontWeight="600"
        // fontWeight="600"
        //
      >
        Available Balance
      </Text>
      <Box flexDirection="row" alignItems="center">
        <Text
          color="buttonColor"
          fontSize={33}
          fontWeight="600"
          lineHeight={42.37}>
          {/* {balanceWhole} */}
          232,323
        </Text>
        <Text color="primary" fontSize={30}>
          .{balanceFraction}
        </Text>
        <Text
          color="buttonColor"
          fontSize={15}
          fontWeight="600"
          marginLeft="xxs">
          {'NGN'}
        </Text>
      </Box>
    </Box>
  );
};
