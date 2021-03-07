import React from 'react';
import {ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

import {palette} from 'constants/theme';

// icons
import eye_off from 'assets/icons/eye-off.svg';
import eye from 'assets/icons/eye.svg';
import auth_logo from 'assets/icons/auth_logo.svg';
import fingerprint from 'assets/icons/fingerprint.svg';
import faceid from 'assets/icons/faceid.svg';

// actual Icons
const ICONS = {
  eye_off: eye_off,
  eye: eye,
  'icon-auth_logo': auth_logo,
  'icon-fingerprint': fingerprint,
  'icon-faceid': faceid,
};

export const Icon = ({name, size = 24, fill = palette.brandColor, style}) => {
  const IconImpl = ICONS[name];
  return IconImpl ? (
    <IconImpl width={size} height={size} fill={fill} {...{style}} />
  ) : null;
};

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  fill: PropTypes.string,
  style: ViewPropTypes.style,
};
