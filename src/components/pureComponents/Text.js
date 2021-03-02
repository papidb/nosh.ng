import React from 'react';
import {createText} from '@shopify/restyle';
import {Text as RNText} from 'react-native';

// Wrap text to set the correct font family based on weight on Android
const _Text = ({style, ...rest}) => {
  // const {fontFamily, fontWeight} = StyleSheet.flatten(style);
  return <RNText style={[style]} {...rest} />;
};

export const Text = createText(_Text);

Text.defaultProps = {
  //   variant: 'bodyText',
  fontFamily: 'Hurme Geometric Sans 1',
};
