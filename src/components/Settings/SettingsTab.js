import React from 'react';
import {TouchableOpacity} from 'react-native';

import {Box, Text, Icon, Circle} from 'components';

export const SettingsTab = ({
  text,
  icon,
  iconProps,
  onPress,
  containerProps,
  circleProps,
  textProps,
}) => {
  return (
    <TouchableOpacity {...{onPress}}>
      <Box
        backgroundColor="whiteFaded"
        flexDirection="row"
        borderRadius={100}
        alignItems="center"
        paddingRight="l"
        marginBottom="xs"
        height={57}
        {...containerProps}>
        <Circle
          size={57}
          backgroundColor="whiteFaded"
          marginRight="xs"
          {...circleProps}>
          <Icon name={icon} size={30} {...iconProps} />
        </Circle>
        <Box
          flex={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginLeft="l">
          <Text fontSize={15} fontWeight="600" {...textProps}>
            {text}
          </Text>
          <Icon size={14} name="icon-forward" />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
