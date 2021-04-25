import React from 'react';
import {TouchableOpacity, ViewPropTypes} from 'react-native';

import PropTypes from 'prop-types';

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
          <Text fontSize={14} fontWeight="600" {...textProps}>
            {text}
          </Text>
          <Icon size={12} name="icon-forward_settings" />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

SettingsTab.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  onPress: PropTypes.func,
  iconProps: ViewPropTypes.style,
  containerProps: PropTypes.object,
  circleProps: PropTypes.object,
  textProps: PropTypes.object,
};
