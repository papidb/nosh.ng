import React from 'react';

import {Box} from 'components';

export const GiftCardBox = (props) => {
  return (
    <Box
      backgroundColor="white"
      padding="xl"
      borderRadius={150}
      alignItems="center"
      justifyContent="center"
      height={80}
      {...props}
    />
  );
};
