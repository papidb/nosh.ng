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
import receipt from 'assets/icons/receipt.svg';
import apple from 'assets/icons/apple.svg';
import home from 'assets/icons/home.svg';
import forward from 'assets/icons/forward.svg';
import forwardgreen from 'assets/icons/forwardgreen.svg';
import settings from 'assets/icons/settings.svg';
import add from 'assets/icons/add.svg';
import bookmark from 'assets/icons/bookmark.svg';
import chat from 'assets/icons/chat.svg';
import expand from 'assets/icons/expand.svg';
import not_visible from 'assets/icons/not_visible.svg';
import power from 'assets/icons/power.svg';
import share from 'assets/icons/share.svg';
// actual Icons
const ICONS = {
  eye_off: eye_off,
  eye: eye,
  'icon-auth_logo': auth_logo,
  'icon-fingerprint': fingerprint,
  'icon-faceid': faceid,
  'icon-receipt': receipt,
  'icon-apple': apple,
  'icon-home': home,
  'icon-forward': forward,
  'icon-forwardgreen': forwardgreen,
  'icon-settings': settings,
  'icon-add': add,
  'icon-bookmark': bookmark,
  'icon-chat': chat,
  'icon-expand': expand,
  'icon-not_visible': not_visible,
  'icon-power': power,
  'icon-share': share,
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
