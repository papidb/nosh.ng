import React from 'react';
import {TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

import {Box, Text, Divider, Icon} from 'components';

export const TransactionTab = ({onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Box flexDirection="row" alignItems="center" marginBottom="s">
        {/* Icon */}
        <Box
          backgroundColor="white"
          height={52}
          width={52}
          borderRadius={52}
          marginRight="m"
          justifyContent="center"
          alignItems="center">
          <Icon name="icon-apple" />
        </Box>
        {/* Text */}
        <Box flex={1}>
          <Text fontSize={16} fontWeight="600" color="text" lineHeight={20.35}>
            USA Apple Itunes
          </Text>
          <Text
            fontSize={12}
            fontWeight="600"
            color="success"
            lineHeight={15.26}>
            April 5 - 2021
          </Text>
        </Box>
        {/* Amount */}
        <Text
          fontWeight="600"
          fontSize={18}
          color="success"
          lineHeight={22.9}
          marginRight="l">
          560,000
        </Text>
      </Box>
      <Divider marginBottom="s" />
    </TouchableOpacity>
  );
};

TransactionTab.propTypes = {
  onPress: PropTypes.func,
};
