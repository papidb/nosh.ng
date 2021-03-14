import React from 'react';
import {ViewPropTypes} from 'react-native';

import PropTypes from 'prop-types';

import {Box, Text} from './pure';
import {AuthAvatar} from './auth';
import {generateReadableName} from 'shared/utils';

export const Header = () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
  };
  return (
    <Box
      flexDirection="row"
      backgroundColor="mostBg"
      paddingHorizontal="l"
      paddingTop="m">
      <Box marginRight="m">
        <AuthAvatar
          size={81}
          containerProps={{alignSelf: 'flex-start', margin: 'none'}}
          imageProps={{style: {height: 50, width: 50}}}
        />
      </Box>
      {/* Remaining */}
      <Box flex={1} alignSelf="center">
        <Text color="primary" fontWeight="bold" fontSize={14}>
          Good Morning
        </Text>
        <Text color="buttonColor" fontWeight="bold" fontSize={20}>
          {generateReadableName(user)}
        </Text>
      </Box>
    </Box>
  );
};

export const HeaderInfo = ({text, containerProps, textProps}) => {
  return (
    <Box
      padding="m"
      borderRadius={100}
      backgroundColor="mostBg"
      {...containerProps}>
      <Text
        color="primary"
        fontWeight="bold"
        textAlign="center"
        fontSize={12}
        {...textProps}>
        {text}
      </Text>
    </Box>
  );
};

HeaderInfo.propTypes = {
  text: PropTypes.string,
  textProps: ViewPropTypes.style,
  containerProps: ViewPropTypes.style,
};
