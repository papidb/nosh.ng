import React from 'react';

import {Box, Text} from 'components';

export const NoNotification = () => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text textAlign="center" color="primary" fontSize={14} fontWeight="600">
        {"There's no notifications. Use our services more\n😭😭😭"}
      </Text>
    </Box>
  );
};
