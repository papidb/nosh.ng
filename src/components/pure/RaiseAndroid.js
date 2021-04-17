import React from 'react';
import {Platform} from 'react-native';
import {Box} from './Box';

export const RaiseAndroid = ({height = 100}) => {
  return Platform.OS == 'android' ? <Box height={height} /> : null;
};
