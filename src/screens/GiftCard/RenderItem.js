import React, {useRef} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {Box, Text, Divider, Button, HeaderInfo, Icon} from 'components';

export const RenderItem = ({item: {title}}) => {
  const imageUri = `https://api.nosh.ng/uploads/images/cards/${title}.png`;

  return (
    <Box>
      <Text>{title}</Text>
      <Image source={{uri: imageUri}} style={{width: 300, height: 220}} />
    </Box>
  );
};
