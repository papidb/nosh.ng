import React from 'react';
import {Platform} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box} from 'components';

export const GiftCard = ({item, ...props}) => {
  const imageUri = item.avatar;
  return (
    <Box>
      <FastImage
        source={{uri: imageUri, priority: FastImage.priority.high}}
        style={{width: 300, height: 220, marginLeft: 50}}
      />
    </Box>
  );
};
