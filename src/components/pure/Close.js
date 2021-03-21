import React from 'react';
import {TouchableOpacity} from 'react-native';

// import PropTypes from 'prop-types';

import {SvgIcon, Circle} from 'components';

export const Close = ({onPress, containerProps, circleProps, closeProps}) => {
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
