import React, {forwardRef} from 'react';
import {ViewPropTypes, Platform} from 'react-native';
import {useRestyle, textRestyleFunctions} from '@shopify/restyle';
import {Text as RNText} from 'react-native';

const isAndroid = Platform.OS === 'android';
const BaseText = (props, ref) => {
  if (props.fontFamily) {
    // props.fontFamily = 'Hurme Geometric Sans 2';
    const isBold = String(props.fontFamily).includes(' Bold');
    // console.log({isBold, isAndroid});
    if (isBold && isAndroid) {
      props.fontFamily = 'Hurme Geometric Sans 2';
    } else {
      props.fontFamily = 'Hurme Geometric Sans 2';
      props.fontWeight = 'bold';
    }
  }
  const styledProps = useRestyle(textRestyleFunctions, props);
  return (
    <RNText fontFamily="Hurme Geometric Sans 2" {...styledProps} ref={ref} />
  );
};
// BaseText.defaultProps = {
//   fontFamily: 'Hurme Geometric Sans 2',
// };
export const Text = forwardRef(BaseText);

BaseText.propTypes = {
  style: ViewPropTypes.style,
};
