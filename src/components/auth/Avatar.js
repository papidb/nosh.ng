import React from 'react';
import {Image} from 'react-native';

import {Box} from '../pure';
import images from 'constants/images';

export const AuthAvatar = ({size = 167, containerProps}) => {
  return (
    <Box
      // margin
      marginTop="xl"
      marginBottom="l"
      alignSelf="center"
      alignItems="center"
      justifyContent="flex-end"
      height={size}
      width={size}
      borderRadius={size}
      overflow="hidden"
      backgroundColor="primary"
      {...containerProps}>
      <Image source={images.auth_face} />
    </Box>
  );
};
