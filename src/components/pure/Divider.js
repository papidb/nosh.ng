import React from 'react';
import {ViewPropTypes, StyleSheet} from 'react-native';

import {Box} from './Box';

export const Divider = ({...props}) => (
  <Box
    // flex={1}
    height={1}
    backgroundColor="inactiveInputBorder"
    style={styles.divider}
    {...props}
  />
);
Divider.propTypes = ViewPropTypes.style;

const styles = StyleSheet.create({
  divider: {marginHorizontal: 35},
});
