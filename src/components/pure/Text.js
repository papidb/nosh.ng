import React, {forwardRef} from 'react';
import {ViewPropTypes, Platform} from 'react-native';
import {useRestyle, textRestyleFunctions} from '@shopify/restyle';
import {Text as RNText} from 'react-native';
import PropTypes from 'prop-types';

const isAndroid = Platform.OS === 'android';

// FIXME: This function is hideous
function double_pascal_case_to_two_words(str) {
  let index;
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    let ch = str.charAt(i);
    if (ch >= 'A' && ch <= 'Z') {
      count++;
    }
    if (count === 2 && !index) {
      index = i;
    }
  }
  if (count === 2) {
    return str.substr(0, index) + ' ' + str.substring(index, str.length);
  } else {
    return str;
  }
}

function font_style_generator(font_family, font_weight, font_style) {
  let fontFamily = `${font_family}`;

  switch (font_weight) {
    case 'normal':
      fontFamily += ' Regular';
      break;
    case 'bold':
      fontFamily += ' Bold';
      break;
    case '100':
      fontFamily += ' Thin';
      break;
    case '200':
      fontFamily += ' Ultralight';
      break;
    case '300':
      fontFamily += ' Light';
      break;
    case '400':
      fontFamily += ' Regular';
      break;
    case '500':
      fontFamily += ' Medium';
      break;
    case '600':
      fontFamily += ' Bold';
      break;
    case '700':
      fontFamily += ' Bold';
      break;
    case '800':
      fontFamily += ' Heavy';
      break;
    case '900':
      fontFamily += ' Black';
      break;
    case 'bolder':
    case 'lighter':
    case 'default':
      fontFamily += 'Regular';
      break;
  }

  if (font_style === 'italic') {
    fontFamily += 'Italic';
  }

  // return {fontFamily: fontFamily, fontWeight: 'normal'};
  return {fontFamily: fontFamily};
}

const BaseText = ({fontWeight, ...props}, ref) => {
  let newProps = {...props};
  if (isAndroid) {
    const purifiedFontStyle = font_style_generator(
      'Hurme Geometric Sans 2',
      fontWeight,
      'normal',
    );

    // console.log(purifiedFontStyle);
    newProps = {
      ...newProps,
      fontWeight,
      fontFamily: purifiedFontStyle.fontFamily,
    };
  }

  const styledProps = useRestyle(textRestyleFunctions, newProps);
  return (
    <RNText
      ref={ref}
      {...styledProps}
      // {...purifiedFontStyle}
      //
    />
  );
};
// BaseText.defaultProps = {
//   fontFamily: 'Hurme Geometric Sans 2',
// };
export const Text = forwardRef(BaseText);

BaseText.propTypes = {
  style: ViewPropTypes.style,
  fontWeight: PropTypes.string,
};
