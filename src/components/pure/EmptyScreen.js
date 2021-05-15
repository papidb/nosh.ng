import React from 'react';

import {Box, Text, Button} from 'components';

export const EmptyScreen = ({text}) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text textAlign="center" color="primary" fontSize={14} fontWeight="600">
        {/* {'There are no transactions. Use our services more\n😭😭😭'} */}
        {text}
      </Text>
    </Box>
  );
};
