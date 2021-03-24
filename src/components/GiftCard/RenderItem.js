import React from 'react';
import FastImage from 'react-native-fast-image';

import {Box} from 'components';

export const RenderItem = ({item: {title}, ...props}) => {
  const imageUri = `https://api.nosh.ng/uploads/images/cards/${title}.png`;

  return (
    <Box>
      <FastImage
        source={{uri: imageUri, priority: FastImage.priority.high}}
        style={{width: 300, height: 220}}
      />
    </Box>
  );
};
