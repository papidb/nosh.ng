import React, {useEffect} from 'react';
import {Platform} from 'react-native';

import {commaFormatter} from 'shared/utils';

import {Box, Text} from 'components';

export const Balance = ({user, text = 'Available Balance', containerProps}) => {
  const balance = user?.wallet?.balance ?? 0;
  const [balanceWhole, balanceFraction] = String(
    commaFormatter(balance, 2),
  ).split('.');
  // const amount = 267000;
  return (
    <Box
      marginHorizontal="s"
      backgroundColor="white"
      padding="m"
      height={Platform.OS === 'ios' ? 93 : 75}
      borderRadius={155}
      justifyContent="center"
      alignItems="center"
      {...containerProps}>
      <Text
        fontSize={12}
        color="primary"
        textAlign="center"
        //
      >
        {text}
      </Text>
      <Box flexDirection="row" alignItems="center" justifyContent="center">
        <Text
          color="buttonColor"
          fontSize={30}
          fontWeight="600"
          lineHeight={35}>
          {balanceWhole}
        </Text>
        <Text color="primary" fontSize={30} lineHeight={35}>
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
