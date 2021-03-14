import React from 'react';
import {Box, Text, Divider} from 'components';

const Balance = () => {
  return (
    <Box>
      <Text>Wallet Balance</Text>
    </Box>
  );
};

export const Home = () => {
  return (
    <Box>
      <Divider marginBottom="m" />
      <Balance />
    </Box>
  );
};
