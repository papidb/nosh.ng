import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';

import {Box} from '../pure';
import images from 'constants/images';

export const AuthAvatar = ({size = 167, containerProps, imageProps}) => {
  return (
    <Box
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
      <Image source={images.auth_face} {...imageProps} />
    </Box>
  );
};

AuthAvatar.propTypes = {
  size: PropTypes.number,
  containerProps: PropTypes.object,
};
