import React, {useRef} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box, Text, Divider, Button, HeaderInfo, Icon} from 'components';

export const RenderItem = ({item: {title}}) => {
  const imageUri = `https://api.nosh.ng/uploads/images/cards/${title}.png`;

  return (
    <Box>
      <Text>{title}</Text>
      <FastImage
        source={{uri: imageUri, priority: FastImage.priority.high}}
        style={{width: 300, height: 220}}
      />
    </Box>
  );
};
