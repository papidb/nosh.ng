import React from 'react';

import {Box} from 'components';

export const GiftCardBox = (props) => {
  return (
    <Box
      backgroundColor="white"
      padding="xl"
      borderRadius={155}
      alignItems="center"
      justifyContent="center"
      height={93}
      {...props}
    />
  );
};
