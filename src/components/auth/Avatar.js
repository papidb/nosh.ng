import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import {Box} from '../pure';
import images from 'constants/images';

export const AuthAvatar = ({
  size = 167,
  avatar,
  containerProps,
  imageProps,
  imagePropsActive,
}) => {
  const active = !!avatar;
  // const active = false;
  if (!imagePropsActive) imagePropsActive = imageProps;
  // const imageUri = `https://api.nosh.ng/${avatar}`;
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
      {active ? (
        <FastImage
          source={{uri: avatar, priority: FastImage.priority.high}}
          {...(active ? imagePropsActive : imageProps)}
        />
      ) : (
        <Image source={images.auth_face} {...imageProps} />
      )}
    </Box>
  );
};

AuthAvatar.propTypes = {
  size: PropTypes.number,
  avatar: PropTypes.string,
  containerProps: PropTypes.object,
  imageProps: PropTypes.object,
};
