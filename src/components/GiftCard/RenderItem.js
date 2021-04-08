import React from 'react';
import {Platform} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box} from 'components';

export const RenderItem = ({item: {title}, ...props}) => {
  const baseImageUrl =
    Platform.OS == 'android'
      ? `https://api.nosh.ng/uploads/images/cards/android/`
      : `https://api.nosh.ng/uploads/images/cards/`;
  const imageUri = `${baseImageUrl}${title}.png`;
  // console.log(imageUri);

  return (
    <Box>
      <FastImage
        source={{uri: imageUri, priority: FastImage.priority.high}}
        style={{width: 300, height: 220}}
      />
    </Box>
  );
};
