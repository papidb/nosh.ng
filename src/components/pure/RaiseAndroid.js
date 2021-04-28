import React from 'react';
import {Platform} from 'react-native';
import {Box} from './Box';

export const RaiseAndroid = ({height = 100}) => {
  return <Box height={height} />;
  // return Platform.OS == 'android' ? (
  //   <Box height={height} />
  // ) : (
  //   <Box height={height} />
  // );
};
