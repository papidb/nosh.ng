import React from 'react';

import {Box, Text, Button} from 'components';

export const SWW = ({
  goToFirst = () => {},
  isFetching = false,
  text = 'Something went wrong!!!',
}) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text textAlign="center" color="white" fontWeight="600">
        {/* Something went wrong!!! */}
        {text}
      </Text>
      <Box marginVertical="l" alignSelf="stretch">
        <Button
          color="error"
          onPress={goToFirst}
          text="Retry"
          loading={isFetching}
        />
      </Box>
    </Box>
  );
};
