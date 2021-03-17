import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Box, Text, Circle, Input, Button, HeaderInfo, Icon} from 'components';
import {GiftCardBox} from './GiftCardBox';

import {commaFormatter} from 'shared/utils';
import images from 'constants/images';

export const SubAmount = ({next, prev}) => {
  const USD_AMOUNT = 1400;
  return (
    <KeyboardAwareScrollView>
      <HeaderInfo text="ENTER TRADE AMOUNT" />
      <Box
        justifyContent="space-between"
        flexDirection="row"
        marginVertical="m">
        <TouchableOpacity
          onPress={() => {
            prev();
          }}>
          <Circle size={42} backgroundColor="white">
            <Icon name="icon-backward" size={14} />
          </Circle>
        </TouchableOpacity>

        <Image source={images.itunes_2} style={{width: 120, height: 67.5}} />
      </Box>
      <GiftCardBox marginVertical="m">
        <Text fontSize={18} fontWeight="600">
          USA Apple Itunes
        </Text>
      </GiftCardBox>
      <Input
        variant="giftcard"
        placeholder="1,400.00"
        keyboardType="number-pad"
        RightIcon={
          <Text fontSize={12} fontWeight="600" color="primary">
            USD
          </Text>
        }
      />
      <GiftCardBox
        marginVertical="m"
        flexDirection="row"
        backgroundColor="mostBg"
        justifyContent="space-between">
        <Text fontSize={24} fontWeight="400" color="success">
          {commaFormatter(USD_AMOUNT)}
        </Text>
        <Text fontSize={12} fontWeight="600" color="success">
          NGN
        </Text>
      </GiftCardBox>

      <Box marginHorizontal="xl" marginTop="s" marginBottom="l">
        <Text fontSize={12} fontWeight="600" color="success">
          YOU GET PAID
        </Text>
      </Box>

      {/* Button */}
      <Button variant="giftcard" text="Continue" onPress={() => next()} />
    </KeyboardAwareScrollView>
  );
};

SubAmount.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};