import React from 'react';
import {Platform} from 'react-native';
import {Box} from './Box';

export const RaiseAndroid = () => {
  return Platform.OS == 'android' ? <Box height={100} /> : null;
};
