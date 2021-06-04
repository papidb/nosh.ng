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
import kuda from 'assets/icons/kuda.svg';
import send from 'assets/icons/send.svg';

import receipt from 'assets/icons/receipt.svg';
import giftcard from 'assets/icons/giftcard.svg';

import apple from 'assets/icons/apple.svg';
import home from 'assets/icons/home.svg';
import forward from 'assets/icons/forward.svg';
import forward_settings from 'assets/icons/forward_settings.svg';
import forwardgreen from 'assets/icons/forwardgreen.svg';
import forwardwarning from 'assets/icons/forwardwarning.svg';
import calculator from 'assets/icons/calculator.svg';
import settings from 'assets/icons/settings.svg';
import add from 'assets/icons/add.svg';
import bookmark from 'assets/icons/bookmark.svg';
import chat from 'assets/icons/chat.svg';
import expand from 'assets/icons/expand.svg';
import not_visible from 'assets/icons/not_visible.svg';
import power from 'assets/icons/power.svg';
import share from 'assets/icons/share.svg';
import edit2 from 'assets/icons/edit2.svg';
import edit_colored from 'assets/icons/edit_colored.svg';
import backward from 'assets/icons/backward.svg';
import dropdown from 'assets/icons/dropdown.svg';
import cart from 'assets/icons/cart.svg';
import notification from 'assets/icons/notification.svg';

// actual Icons
const ICONS = {
  eye_off: eye_off,
  eye: eye,
  'icon-auth_logo': auth_logo,
  'icon-fingerprint': fingerprint,
  'icon-faceid': faceid,
  'icon-receipt': receipt,
  'icon-giftcard': giftcard,
  'icon-apple': apple,
  'icon-home': home,
  'icon-forward': forward,
  'icon-forward_settings': forward_settings,
  'icon-forwardgreen': forwardgreen,
  'icon-forwardwarning': forwardwarning,
  'icon-calculator': calculator,
  'icon-settings': settings,
  'icon-add': add,
  'icon-bookmark': bookmark,
  'icon-chat': chat,
  'icon-expand': expand,
  'icon-not_visible': not_visible,
  'icon-power': power,
  'icon-share': share,
  'icon-backward': backward,
  'icon-dropdown': dropdown,
  'icon-cart': cart,
  'icon-edit2': edit2,
  'icon-edit_colored': edit_colored,
  'icon-notification': notification,
  'icon-kuda': kuda,
  'icon-send': send,
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
