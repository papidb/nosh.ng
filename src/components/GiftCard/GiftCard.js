import React from 'react';
import {Platform} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box} from 'components';
const IS_ANDROID = Platform.OS === 'android';

export const GiftCard = ({item, ...props}) => {
  const avatars = item?.avatars ?? {};
  // console.log({avatars});
  const imageUri = IS_ANDROID ? avatars?.android : avatars.ios;
  return (
    <Box>
      <FastImage
        source={{uri: imageUri, priority: FastImage.priority.high}}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: 300,
          height: 220,
          ...(Platform.OS === 'android'
            ? {
                marginLeft: 25,
              }
            : {
                // transform: [{scaleX: -1}],
                // marginRight: 25,
              }),
        }}
      />
    </Box>
  );
};
