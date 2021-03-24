import React from 'react';
import {ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

import {Box} from './Box';

export const Circle = ({size, ...props}) => (
  <Box
    height={size}
    width={size}
    borderRadius={size}
    alignItems="center"
    justifyContent="center"
    {...props}
  />
);
Circle.propTypes = {
  size: PropTypes.number,
  ...ViewPropTypes.style,
};
