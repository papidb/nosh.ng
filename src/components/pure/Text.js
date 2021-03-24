import React, {forwardRef} from 'react';
import {ViewPropTypes} from 'react-native';
import {useRestyle, textRestyleFunctions} from '@shopify/restyle';
import {Text as RNText} from 'react-native';

const BaseText = (props, ref) => {
  const styledProps = useRestyle(textRestyleFunctions, props);
  return <RNText {...styledProps} ref={ref} />;
};
export const Text = forwardRef(BaseText);

BaseText.propTypes = {
  style: ViewPropTypes.style,
};
