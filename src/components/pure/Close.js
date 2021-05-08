import React from 'react';
import {TouchableOpacity} from 'react-native';

// import PropTypes from 'prop-types';

import {Circle} from './Circle';
import SvgIcon from '../svgs';

export const Close = ({
  onPress,
  containerProps,
  circleProps,
  closeProps,
  Icon = SvgIcon.CloseIcon,
}) => {
  return (
    <TouchableOpacity onPress={onPress} {...containerProps}>
      <Circle
        size={41}
        borderWidth={4}
        borderColor="primary"
        alignSelf="flex-end"
        {...circleProps}>
        <Icon {...closeProps} />
      </Circle>
    </TouchableOpacity>
  );
};

export const CloseLight = ({
  onPress,
  containerProps,
  circleProps,
  closeProps,
}) => {
  return (
    <TouchableOpacity onPress={onPress} {...containerProps}>
      <Circle
        size={41}
        borderWidth={4}
        borderColor="primary"
        alignSelf="flex-end"
        {...circleProps}>
        <SvgIcon.CloseIcon {...closeProps} />
      </Circle>
    </TouchableOpacity>
  );
};
